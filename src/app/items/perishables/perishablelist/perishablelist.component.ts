import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { PerishablesService } from 'src/app/services/perishables.service';
import { item } from 'src/app/services/item.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { ItemAdditionService } from 'src/app/services/item-addition.service';
import { ItemRemovalService } from 'src/app/services/item-removal.service';
import { AvailableItemsService } from 'src/app/services/available-items.service';
import { UiService } from 'src/app/services/ui.service';
import { PeriqunatitydialogComponent } from '../periqunatitydialog/periqunatitydialog.component';
import { NewperishablesComponent } from '../newperishables/newperishables.component';

@Component({
  selector: 'app-perishablelist',
  templateUrl: './perishablelist.component.html',
  styleUrls: ['./perishablelist.component.css']
})
export class PerishablelistComponent implements OnInit,OnDestroy {

  @Input() newAdditions: any;
  @Input('item') items: item;
  Additemsub: Subscription;
  Removeitemsub: Subscription;
  tablearray: Array<any>;
  addcart: any;
  removecart: any;
  quantity: number;
  searchKey: string;
  listData: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: PerishablesService,
    private dialog: MatDialog,
    private ItemAddService: ItemAdditionService,
    private itemRemovalService: ItemRemovalService,
    private availableitemservice:AvailableItemsService,
    private uiservice: UiService) {

  }


  displayedColumns: string[] = ['item_name', 'Quantity', 'Addition', 'Removal', 'actions'];





  //  Quantity dialog
  openDialog(perishable, pos): void {
    const dialogRef = this.dialog.open(PeriqunatitydialogComponent, {
      width: '250px',
      data: { Quantity: this.quantity }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.quantity = result;
      if (pos == 'add') {
        if (this.quantity) {
          this.ItemAddService.Addtocartfromdialog(perishable, this.quantity)

        }
        this.quantity = undefined;
      }
      else if (pos == 'remove') {
        if (this.quantity - perishable.Quantity > 0) {
          this.uiservice.showSnackbar("Invalid Quantity", null, 3000)
        }
        else if (this.quantity) {
          this.itemRemovalService.AddtoRemovecartfromdialog(perishable, this.quantity)
        }
        this.quantity = undefined;
      }
    }
    );
  }

  async ngOnInit() {
    this.service.getperishables().subscribe(
      list => {
        let array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
        this.tablearray = array;
        // console.log(array)
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      }


    );
    // getting the adding cart
    this.Additemsub = (await this.ItemAddService.getvoucher()).valueChanges().subscribe(cart => {
      this.addcart = cart
    })



    this.Removeitemsub = (await this.itemRemovalService.getRemovecart()).subscribe(cart => {
      this.removecart = cart
    })

  }


  //Search clearing on filter
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  // Applying the filter
  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  // Create button
  OnCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    this.dialog.open(NewperishablesComponent, dialogConfig);
  }

  //Edit button 
  onEdit(row) {
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    let dialogref=this.dialog.open(NewperishablesComponent, dialogConfig);
    dialogref.componentInstance.updateEvent.subscribe(data=>{
      let flag=false;
    if(data){
      flag=true;
      this.ItemAddService.removeitem(row.$key,row);
      this.itemRemovalService.removeitem(row.$key,row);
      this.availableitemservice.modifyname(row.$key,data,"perishable")
    }
    })
  
  }

  // Deletebutton
  onDelete($key, row) {
    if (confirm('Are you sure to delete this record ?')) {
      this.service.deleteperishables($key, row)
      this.availableitemservice.deleteavailableGlassware($key, row);
    }
  }


  // New additions
  addto(perishable) {
    console.log(perishable);
    this.ItemAddService.Addtovoucher(perishable);
  }

  subtractfromcart(perishable) {
    this.ItemAddService.subfromvoucher(perishable);
  }

  // cart reset
  onRemove($key, row) {
    if (confirm('Are you sure to reset this record ?')) {
      this.ItemAddService.removeitem($key, row)
      this.itemRemovalService.removeitem($key,row)
    }
  }


  // getting the quantity for add cart
  getQuantity($key) {
    if (!this.addcart) return 0;
    if (!this.addcart.items) return 0;
    let item = this.addcart.items[$key]
    return item ? item.Quantity : 0;
  }

  // getting the quantity for remove cart
  getremovecartQuantity($key) {
    if (!this.removecart) return 0;
    if (!this.removecart.items) return 0;

    let item = this.removecart.items[$key]

    return item ? item.Quantity : 0;

  }

  ngOnDestroy() {
    this.Additemsub.unsubscribe();
    this.Removeitemsub.unsubscribe();
  }

// Adding to remove cart
  addtoRemovecart(item) {
    this.itemRemovalService.addtoRemovecart(item);

  }

  // subtracting items from remove cart
  subtractfromRemovecart(item) {
    this.itemRemovalService.subfromRemovecart(item);


  }
}
