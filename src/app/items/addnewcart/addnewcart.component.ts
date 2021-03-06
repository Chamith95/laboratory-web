import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemAdditionService } from 'src/app/services/item-addition.service';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';
import { QuantitydialogComponent } from '../glassware/quantitydialog/quantitydialog.component';
import { UiService } from 'src/app/services/ui.service';
import { AvailableItemsService } from 'src/app/services/available-items.service';


@Component({
  selector: 'app-addnewcart',
  templateUrl: './addnewcart.component.html',
  styleUrls: ['./addnewcart.component.css']
})
export class AddnewcartComponent implements OnInit {
  cart11$
  cartitemArray: any[] = [];
  cartitemArrayWithoutkey: any[] = [];
  listData: MatTableDataSource<any>;
  originalglasswarequantities: any[] = []
  originalchemicalquantities: any[] = []
  originalperishablequantities: any[] = []
  originalpermEquipmentquantities: any[] = []
  availableglasswarequantities: any[] = []
  availablechemicalquantities: any[] = []
  availablePerishablequantities: any[] = []
  availablePermEquipquantities: any[] = []
  updatedQuantities: any[] = []
  updatedavailableQuantities: any[] = []
  dialogquantity: number;
  dataavailableflag: boolean = false;
  startdate: Date;
  vouid;

  iscartnotempty: boolean = false;

  planModel: any = { start_time: new Date() };


  constructor(private itemAddservice: ItemAdditionService, 
    private dialog: MatDialog,
    private availableitemsservice:AvailableItemsService,
    private uiservice: UiService,
    private snackBar: MatSnackBar) {
    this.startdate = new Date;

  }

  displayedColumns: string[] = ['item_name', 'category','OriginalQuantity','Addition','actions'];


  openDialog(glassware): void {
    const dialogRef = this.dialog.open(QuantitydialogComponent, {
      width: '250px',
      data: { Quantity: this.dialogquantity }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.dialogquantity = result;
      if (this.dialogquantity) {
        this.itemAddservice.Addtocartfromdialog(glassware, this.dialogquantity)
      }
      this.dialogquantity = undefined;
      this.cartitemArray = [];
    });
  }

  async ngOnInit() {
    // getting last vou id and settong it
    this.itemAddservice.getaddvouchers().subscribe(item=>{
      let k
      console.log(item)
      if(item.length>0){
      k=+(item[item.length-1].Voucher_Id)+1;
      }
      else{
        k=1001
      }
      this.vouid=k;

    })
   
    let cart$ =(await this.itemAddservice.getvoucher()).valueChanges()
      .subscribe(item => {
        const newObj: any = item;

        //checking if cart is empty
        if (newObj != undefined) {
          this.iscartnotempty = true;
        } else {
          this.iscartnotempty = false;
        }
// getting and mapping cart items
        if(newObj){
        this.itemAddservice.getoriginalglasswarequantities().subscribe(originalglasswareitems=>{
          for (let item in newObj.items) {
            if(newObj.items[item].category=="Glassware"){
            for(let j=0;j<originalglasswareitems.length;j++){
              if(newObj.items[item].item_name==originalglasswareitems[j].item_name){
            let obj = {
              $key: item,
              item_name: originalglasswareitems[j].item_name,
              category: originalglasswareitems[j].category,
              measurement: originalglasswareitems[j].measurement,
              OriginalQuantity:originalglasswareitems[j].Quantity,
              Quantity: newObj.items[item].Quantity,
              available: originalglasswareitems[j].available,
              recomended: originalglasswareitems[j].recomended
            }
            this.cartitemArray.push(obj);
          }
           
          }}
          }
        })

        this.itemAddservice.getoriginalPerishableQuantities().subscribe(originalperishableItems=>{
          for (let item in newObj.items) {
            if(newObj.items[item].category=="Perishables"){
            for(let j=0;j<originalperishableItems.length;j++){
              if(newObj.items[item].item_name==originalperishableItems[j].item_name){
            let obj = {
              $key: item,
              item_name: originalperishableItems[j].item_name,
              category: originalperishableItems[j].category,
              measurement:originalperishableItems[j].measurement,
              OriginalQuantity:originalperishableItems[j].Quantity,
              Quantity: newObj.items[item].Quantity,
              available: originalperishableItems[j].available,
              recomended:originalperishableItems[j].recomended
            }
            this.cartitemArray.push(obj);
          }
           
          }}
          }
        })

        this.itemAddservice.getoriginalpermEquipQuantities().subscribe(originalPermEquipItems=>{
          for (let item in newObj.items) {
            if(newObj.items[item].category=="Permanent Equipment"){
            for(let j=0;j<originalPermEquipItems.length;j++){
              if(newObj.items[item].item_name==originalPermEquipItems[j].item_name){
            let obj = {
              $key: item,
              item_name: originalPermEquipItems[j].item_name,
              category: originalPermEquipItems[j].category,
              measurement: originalPermEquipItems[j].measurement,
              OriginalQuantity:originalPermEquipItems[j].Quantity,
              Quantity: newObj.items[item].Quantity,
              available: originalPermEquipItems[j].available,
              recomended:originalPermEquipItems[j].recomended

            }
            this.cartitemArray.push(obj);
          }
           
          }}
          }
        })

        this.itemAddservice.getoriginalchemicalquantities().subscribe(orichemitem=>{
          for (let item in newObj.items) {
            if(newObj.items[item].category=="Chemicals"){
            for(let j=0;j<orichemitem.length;j++){
              if(newObj.items[item].item_name==orichemitem[j].item_name){
            let obj = {
              $key: item,
              item_name: orichemitem[j].item_name,
              category: orichemitem[j].category,
              measurement: orichemitem[j].measurement,
              OriginalQuantity:orichemitem[j].Quantity,
              Quantity: newObj.items[item].Quantity,
              available: orichemitem[j].available,
              recomended:orichemitem[j].recomended,
            }
            this.cartitemArray.push(obj);
          }
           
          }}
          }
          console.log(this.cartitemArray);
        this.listData = new MatTableDataSource(this.cartitemArray);
         
        })
      }
        

    

        
    
        if (this.cartitemArray.length > 0) {
          this.dataavailableflag = true;
        }
        // console.log(this.dataavailableflag);
      })

// Getting original glassware quantities
    this.itemAddservice.getoriginalglasswarequantities().subscribe(item => {
      this.originalglasswarequantities = item;

    })
// Getting original chemical quantities
    this.itemAddservice.getoriginalchemicalquantities().subscribe(item => {
      this.originalchemicalquantities = item;

    })

    this.itemAddservice.getoriginalPerishableQuantities().subscribe(item => {
      this.originalperishablequantities = item;

    })
    this.itemAddservice.getoriginalpermEquipQuantities().subscribe(item => {
      this.originalpermEquipmentquantities = item;

    })

// Getting available glassware quantities
    this.availableitemsservice.getavailableglasswarequantities().subscribe(item =>{
      this.availableglasswarequantities=item;
    })
// getting available chemical quantities
    this.availableitemsservice.getavailablechemicalquantities().subscribe(item =>{
      this.availablechemicalquantities=item;
    })

    this.availableitemsservice.getAvailablePerishableItems().subscribe(item =>{
      this.availablePerishablequantities=item;
    })
    
    this.availableitemsservice.getAvailablePermEquipItems().subscribe(item =>{
      this.availablePermEquipquantities=item;
    })
  }


  // adding new or increasing the quantity of the cart
  addto(item) {
    this.itemAddservice.Addtovoucher(item);
    this.cartitemArray = [];
  }

  // subtracting items from cart
  subtractfromcart(item) {
    this.itemAddservice.subfromvoucher(item);
    this.cartitemArray = [];

  }

  onDelete($key, row) {
    if (confirm('Are you sure to delete this record ?')) {
      this.itemAddservice.removeitem($key, row)
      this.cartitemArray = [];
    }
  }





  onSubmit(form: NgForm) {

    let array = this.cartitemArray.map(list => {
      return {
        item_name: list.item_name,
        category: list.category,
        measurement: list.measurement,
        Quantity: list.Quantity,
      };

    }
    
    )

    this.cartitemArrayWithoutkey = array;
    // sending data to newadditions database
    console.log(this.cartitemArrayWithoutkey);
    this.itemAddservice.confirmaddition({
      Voucher_Id: this.vouid,
      Recieved_from: form.value.Recfrom,
      Date_Recieved: form.value.createdate.toDateString(),
      items: this.cartitemArrayWithoutkey,
    });


    // mapping inorder to update original and available quantities
    for (let i = 0; i < this.cartitemArray.length; i++) {
      if (this.cartitemArray[i].category == "Glassware") {
        // mapping original glassware quantities
        for (let j = 0; j < this.originalglasswarequantities.length; j++) {
          if (this.cartitemArray[i].item_name == this.originalglasswarequantities[j].item_name) {
            let updateditem = {
              $key: this.cartitemArray[i].$key,
              item_name: this.originalglasswarequantities[j].item_name,
              category: this.originalglasswarequantities[j].category,
              measurement: this.originalglasswarequantities[j].measurement,
              Quantity: (this.originalglasswarequantities[j].Quantity + this.cartitemArray[i].Quantity),
              available: (this.originalglasswarequantities[j].available + this.cartitemArray[i].Quantity),
              recomended: this.originalglasswarequantities[j].recomended
            }

            this.updatedQuantities.push(updateditem);
          }
        }
        // mapping available quantities

      }


      if (this.cartitemArray[i].category == "Chemicals") {
        for (let j = 0; j < this.originalchemicalquantities.length; j++) {
          if (this.cartitemArray[i].item_name == this.originalchemicalquantities[j].item_name) {
            let updateditem = {
              $key: this.cartitemArray[i].$key,
              item_name: this.originalchemicalquantities[j].item_name,
              category: this.originalchemicalquantities[j].category,
              measurement: this.originalchemicalquantities[j].measurement,
              Quantity: (this.originalchemicalquantities[j].Quantity + this.cartitemArray[i].Quantity),
              available: (this.originalchemicalquantities[j].available + this.cartitemArray[i].Quantity),
              recomended: this.originalchemicalquantities[j].recomended
            }

            this.updatedQuantities.push(updateditem);
          }
        }


      }

      if (this.cartitemArray[i].category == "Perishables") {
        for (let j = 0; j < this.originalperishablequantities.length; j++) {
          if (this.cartitemArray[i].item_name == this.originalperishablequantities[j].item_name) {
            let updateditem = {
              $key: this.cartitemArray[i].$key,
              item_name: this.originalperishablequantities[j].item_name,
              category: this.originalperishablequantities[j].category,
              measurement: this.originalperishablequantities[j].measurement,
              Quantity: (this.originalperishablequantities[j].Quantity + this.cartitemArray[i].Quantity),
              available: (this.originalperishablequantities[j].available + this.cartitemArray[i].Quantity),
              recomended: this.originalperishablequantities[j].recomended
            }

            this.updatedQuantities.push(updateditem);
          }
        }

 
      }

      if (this.cartitemArray[i].category == "Permanent Equipment") {
        for (let j = 0; j < this.originalpermEquipmentquantities.length; j++) {
          if (this.cartitemArray[i].item_name == this.originalpermEquipmentquantities[j].item_name) {
            let updateditem = {
              $key: this.cartitemArray[i].$key,
              item_name: this.originalpermEquipmentquantities[j].item_name,
              category: this.originalpermEquipmentquantities[j].category,
              measurement: this.originalpermEquipmentquantities[j].measurement,
              Quantity: (this.originalpermEquipmentquantities[j].Quantity + this.cartitemArray[i].Quantity),
              available: (this.originalpermEquipmentquantities[j].available + this.cartitemArray[i].Quantity),
              recomended: this.originalpermEquipmentquantities[j].recomended
            }

            this.updatedQuantities.push(updateditem);
          }
        }

  
      }
    }

    console.log(this.updatedQuantities);
     this.itemAddservice.updateoriginalQuantities(this.updatedQuantities)
    // console.log(this.updatedQuantities)
    // updating the availablequantities
    // this.availableitemsservice.updateavailableQuantities(this.updatedavailableQuantities);
    this.updatedQuantities = [];
   this.uiservice.showSnackbar("Items Successfully added", null, 3000);
     this.clearvoucart();
  }

  // Clearing the cart
  clearvoucart() {
    this.itemAddservice.clearvouchercart();
    this.cartitemArray = [];
  }





}
