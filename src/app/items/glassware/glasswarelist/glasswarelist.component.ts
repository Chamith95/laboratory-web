import { Component, OnInit,ViewChild, Input, OnDestroy } from '@angular/core';

import { ItemService } from 'src/app/services/item.service';
import {MatTableDataSource,} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {MatDialog,MatDialogConfig} from '@angular/material'
import { NewglasswareComponent } from '../newglassware/newglassware.component';
import { ItemAdditionService } from '../../../services/item-addition.service';
import {Subscription} from 'rxjs';
import { item } from 'src/app/services/item.model';
import { QuantitydialogComponent } from '../quantitydialog/quantitydialog.component';

@Component({
  selector: 'app-glasswarelist',
  templateUrl: './glasswarelist.component.html',
  styleUrls: ['./glasswarelist.component.css']
})
export class GlasswarelistComponent implements OnInit,OnDestroy{ 
  @Input() newAdditions:any;
  @Input('item') items: item;
  Additemsub:Subscription;
  addcart:any;
  quantity:number;

  constructor(private service:ItemService ,private dialog:MatDialog,private ItemAddService:ItemAdditionService) { 
    
  }

  listData:MatTableDataSource<any>;
  displayedColumns:string[]=['category_name','Quantity','Addition','actions'];

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  searchKey:string;

 
  openDialog(glassware): void {
    const dialogRef = this.dialog.open(QuantitydialogComponent, {
      width: '250px',
      data: { Quantity: this.quantity}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.quantity = result;
      if(this.quantity){
      this.ItemAddService.Addtocartfromdialog(glassware,this.quantity)
      }
      this.quantity=undefined;
    });
  }

 async ngOnInit() {
    this.service.getGlassware().subscribe(
      list=>{
        let array =list.map(item => {
          return{
              $key:item.key,
            ...item.payload.val()
          };
        });
        // console.log(array)
        this.listData=new MatTableDataSource(array);
        this.listData.sort=this.sort;
        this.listData.paginator=this.paginator;
      }
       

    );
     this.Additemsub=(await this.ItemAddService.getvoucher()).valueChanges().subscribe(cart=>{
      //  console.log(cart)
       this.addcart=cart
     })

      console.log( this.addcart);
    
     ;

  }

   // AddingCart
  

  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }

  applyFilter(){
    this.listData.filter =this.searchKey.trim().toLowerCase();
  }

  OnCreate(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.autoFocus=false;
    this.dialog.open(NewglasswareComponent,dialogConfig);
  }

  //Edit button 
  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.autoFocus=false;
    this.dialog.open(NewglasswareComponent,dialogConfig);
  }

  // Deletebutton
  onDelete($key){
    if(confirm('Are you sure to delete this record ?')){
    this.service.deleteGlassware($key)
    }
  }

  // New additions


  addto(glassware){
     console.log(glassware);
    this.ItemAddService.Addtovoucher(glassware);
  }

  subtractfromcart(glassware){
    this.ItemAddService.subfromvoucher(glassware);
  }

  // Get addedQuantity
  getQuantity($key){
    // let k=$key;
   
    if(!this.addcart)  return 0;
    if(!this.addcart.items) return 0;
 
    let item=this.addcart.items[$key]

    return item?item.Quantity : 0;
 
  }

  ngOnDestroy(){
    this.Additemsub.unsubscribe();
  }
}
