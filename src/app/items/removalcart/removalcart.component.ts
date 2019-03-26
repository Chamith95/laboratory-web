import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { ItemRemovalService } from 'src/app/services/item-removal.service';
import { QuantitydialogComponent } from '../glassware/quantitydialog/quantitydialog.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-removalcart',
  templateUrl: './removalcart.component.html',
  styleUrls: ['./removalcart.component.css']
})
export class RemovalcartComponent implements OnInit {
  cartitemArray:any[]=[];
  cartitemArrayWithoutkey:any[]=[];
  listData:MatTableDataSource<any>;
  originalquantities:any[]=[]
  updatedQuantities:any[]=[]
  dialogquantity:number;
  quantityvalidflag:boolean=true;

  constructor(private itemremovalservice:ItemRemovalService,private dialog:MatDialog) { }

 async ngOnInit() {
    let cart$=(await this.itemremovalservice.getRemovecart()).subscribe(item =>{
      const newObj: any = item;
      console.log(newObj);
          
      for(let item in newObj.items){
            let obj={$key:item,
              item_name: newObj.items[item].item_name,
              category: newObj.items[item].category,
              Quantity: newObj.items[item].Quantity}
            this.cartitemArray.push(obj);
           }

           let array=this.cartitemArray.map(list=>{
            return{
              item_name:list.item_name,
              category: list.category,
              Quantity:list.Quantity,
          };
     
           }
           
           )
           this.cartitemArrayWithoutkey=array;
           console.log(this.cartitemArrayWithoutkey);
           this.listData=new MatTableDataSource(this.cartitemArray);
          
    })
// Getting original qunatities
    this.itemremovalservice.getoriginalquantities().subscribe(item=>{
      this.originalquantities=item;

    })
  }

  openDialog(glassware): void {
    const dialogRef = this.dialog.open(QuantitydialogComponent, {
      width: '250px',
      data: { Quantity: this.dialogquantity}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.dialogquantity = result;
      if(this.dialogquantity){
      this.itemremovalservice.AddtoRemovecartfromdialog(glassware,this.dialogquantity)
      }
      this.dialogquantity=undefined;
      this.cartitemArray=[];
    });
  }


  displayedColumns: string[] = ['Category','Addition'];


  addtoRemovecart(item){
    this.itemremovalservice.addtoRemovecart(item);
    this.cartitemArray=[];
     }
    
    // subtracting items from cart
    subtractfromRemovecart(item){
    this.itemremovalservice.subfromRemovecart(item);
    this.cartitemArray=[];
    
    }

    onSubmit(form: NgForm){
      this.itemremovalservice.confirmaddition({
       Voucher_Id:form.value.voucherNo,
       Reason:form.value.Reason,
       Date_Removed:form.value.createdate.toDateString(),
       items:this.cartitemArrayWithoutkey,
         } );
   
         for(let i=0;i<this.cartitemArray.length;i++){
           for(let j=0;j<this.originalquantities.length;j++){
             if(this.cartitemArray[i].item_name==this.originalquantities[j].item_name){
               let updateditem={$key:this.cartitemArray[i].$key,
                 item_name:this.originalquantities[j].item_name,
                 category:this.originalquantities[j].category,
                 Quantity:(this.originalquantities[j].Quantity-this.cartitemArray[i].Quantity)}
                if (this.originalquantities[j].Quantity-this.cartitemArray[i].Quantity<0){
                  this.quantityvalidflag=false;
                }
               console.log(updateditem);
               this.updatedQuantities.push(updateditem);
             }
           }
         }
   
     
     
        if(this.quantityvalidflag==true){
        this.itemremovalservice.updateoriginalQuantities(this.updatedQuantities)
        }
        else{
          console.log("invalid removal")
        }
         console.log(this.updatedQuantities)
    
     this.updatedQuantities=[];
   
      this.clearvoucart();
     }
     clearvoucart(){
       this.itemremovalservice.clearRemovecart();
       this.cartitemArray=[];
     }
   
}
