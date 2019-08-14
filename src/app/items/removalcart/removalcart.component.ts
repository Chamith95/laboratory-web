import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { ItemRemovalService } from 'src/app/services/item-removal.service';
import { QuantitydialogComponent } from '../glassware/quantitydialog/quantitydialog.component';
import { NgForm } from '@angular/forms';
import { UiService } from 'src/app/services/ui.service';
import { AvailableItemsService } from 'src/app/services/available-items.service';

@Component({
  selector: 'app-removalcart',
  templateUrl: './removalcart.component.html',
  styleUrls: ['./removalcart.component.css']
})
export class RemovalcartComponent implements OnInit {
  selected = 'Depleted';
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
  quantityvalidflag: boolean = true;
  iscartnotempty: boolean = false;
  public reasons : any = {};
  itemcount;
  vouid;

  planModel: any = { start_time: new Date() };



  constructor(private itemremovalservice: ItemRemovalService, private dialog: MatDialog,
    private availableitemsservice:AvailableItemsService,
    private uiservice: UiService) {}

async ngOnInit() {

    this.itemremovalservice.getRemvouchers().subscribe(item=>{
      let k
      if(item.length>0){
      k=+(item[item.length-1].Voucher_Id)+1;
      }
      else{
        k=1001
      }
      this.vouid=k;

    })

    let cart$ = (await this.itemremovalservice.getRemovecart()).subscribe(item => {
      const newObj: any = item;
      let count=0;
      if(newObj){
      for(let item in newObj.items){
        count+=1;
      }
    }
      this.itemcount=count;


      //checking if cart is empty
      if (newObj!= undefined) {
        this.iscartnotempty = true;
      } else {
        this.iscartnotempty = false;
      }

      if(newObj){
        this.itemremovalservice.getoriginalglasswarequantities().subscribe(originalglasswareitems=>{
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

        this.itemremovalservice.getoriginalPerishableQuantities().subscribe(originalperishableItems=>{
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

        this.itemremovalservice.getoriginalpermEquipQuantities().subscribe(originalPermEquipItems=>{
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

        this.itemremovalservice.getoriginalchemicalquantities().subscribe(orichemitem=>{
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
      // for (let item in newObj.items) {
      //   let obj = {
      //     $key: item,
      //     item_name: newObj.items[item].item_name,
      //     category: newObj.items[item].category,
      //     measurement: newObj.items[item].measurement,
      //     Quantity: newObj.items[item].Quantity
      //   }
      //   this.cartitemArray.push(obj);
      // }


      // this.listData = new MatTableDataSource(this.cartitemArray);

    })
    // Getting original qunatities
    this.itemremovalservice.getoriginalglasswarequantities().subscribe(item => {
      this.originalglasswarequantities = item;

    })

    this.itemremovalservice.getoriginalchemicalquantities().subscribe(item => {
      this.originalchemicalquantities = item;

    })

    this.itemremovalservice.getoriginalPerishableQuantities().subscribe(item => {
      this.originalperishablequantities = item;

    })
    this.itemremovalservice.getoriginalpermEquipQuantities().subscribe(item => {
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

  openDialog(item): void {
    const dialogRef = this.dialog.open(QuantitydialogComponent, {
      width: '250px',
      data: { Quantity: this.dialogquantity }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.dialogquantity = result;
      if (this.dialogquantity <=item.OriginalQuantity) {
        this.itemremovalservice.AddtoRemovecartfromdialog(item, this.dialogquantity)
      }else{
        this.uiservice.showSnackbar("Cannot remove more than available",null,3000);
      }
      this.dialogquantity = undefined;
      this.cartitemArray = [];
    });
  }


  displayedColumns: string[] = ['item_name','Category','OriginalQuantity', 'Addition','Reason'];


  addtoRemovecart(item) {
    this.itemremovalservice.addtoRemovecart(item);
    this.cartitemArray = [];
  }

  // subtracting items from cart
  subtractfromRemovecart(item) {
    this.itemremovalservice.subfromRemovecart(item);
    this.cartitemArray = [];

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

    for(let i=0;i<this.itemcount;i++){
      this.cartitemArrayWithoutkey[i].Reason=this.reasons[i];
    }
   
    console.log(this.cartitemArrayWithoutkey);
  
    this.itemremovalservice.confirmremoval({
      Voucher_Id: this.vouid,
      Date_Removed: form.value.createdate.toDateString(),
      items: this.cartitemArrayWithoutkey,
    });

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
              Quantity: (this.originalglasswarequantities[j].Quantity - this.cartitemArray[i].Quantity),
              available: (this.originalglasswarequantities[j].available - this.cartitemArray[i].Quantity),
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
              Quantity: (this.originalchemicalquantities[j].Quantity - this.cartitemArray[i].Quantity),
              available: (this.originalchemicalquantities[j].available - this.cartitemArray[i].Quantity),
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
              Quantity: (this.originalperishablequantities[j].Quantity - this.cartitemArray[i].Quantity),
              available: (this.originalperishablequantities[j].available - this.cartitemArray[i].Quantity),
              recomended: this.originalperishablequantities[j].recomended
            }

            this.updatedQuantities.push(updateditem);
          }
        }

 
      }

      if (this.cartitemArray[i].category == "Permenent Equipment") {
        for (let j = 0; j < this.originalpermEquipmentquantities.length; j++) {
          if (this.cartitemArray[i].item_name == this.originalpermEquipmentquantities[j].item_name) {
            let updateditem = {
              $key: this.cartitemArray[i].$key,
              item_name: this.originalpermEquipmentquantities[j].item_name,
              category: this.originalpermEquipmentquantities[j].category,
              measurement: this.originalpermEquipmentquantities[j].measurement,
              Quantity: (this.originalpermEquipmentquantities[j].Quantity - this.cartitemArray[i].Quantity),
              available: (this.originalpermEquipmentquantities[j].available - this.cartitemArray[i].Quantity),
              recomended: this.originalpermEquipmentquantities[j].recomended
            }

            this.updatedQuantities.push(updateditem);
          }
        }

  
      }
    }


    if (this.quantityvalidflag == true) {
      this.itemremovalservice.updateoriginalQuantities(this.updatedQuantities);
    }
    else {
      console.log("invalid removal")
    }



    this.uiservice.showSnackbar("Items Successfully Removed", null, 3000);
    this.updatedQuantities = [];

    this.clearvoucart();
  }

  // Clearing the cart
  clearvoucart() {

    this.itemremovalservice.clearRemovecart();
    this.cartitemArray = [];
  }

}
