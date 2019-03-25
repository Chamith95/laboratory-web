import { Component, OnInit } from '@angular/core';
import { ItemAdditionService } from 'src/app/services/item-addition.service';
import { DataSource } from '@angular/cdk/table';
import { ShowOnDirtyErrorStateMatcher, MatTableDataSource, MatDialog } from '@angular/material';
import { NgForm } from '@angular/forms';
import { IfStmt } from '@angular/compiler';
import { QuantitydialogComponent } from '../glassware/quantitydialog/quantitydialog.component';




@Component({
  selector: 'app-addnewcart',
  templateUrl: './addnewcart.component.html',
  styleUrls: ['./addnewcart.component.css']
})
export class AddnewcartComponent implements OnInit {
  cart11$
  cartitemArray:any[]=[];
  cartitemArrayWithoutkey:any[]=[];
  listData:MatTableDataSource<any>;
  originalquantities:any[]=[]
  updatedQuantities:any[]=[]
  dialogquantity:number;

 

  constructor(private itemAddservice:ItemAdditionService,private dialog:MatDialog) {
    
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
      this.itemAddservice.Addtocartfromdialog(glassware,this.dialogquantity)
      }
      this.dialogquantity=undefined;
      this.cartitemArray=[];
    });
  }

  ngOnInit() {
    let cart$=this.itemAddservice.getvouchersync()
            .subscribe(item =>{
              const newObj: any = item;
                  
              for(let item in newObj.items){
                    let obj={$key:item,category_name: newObj.items[item].category_name,Quantity: newObj.items[item].Quantity}
                    this.cartitemArray.push(obj);
                   }

                   let array=this.cartitemArray.map(list=>{
                    return{
                      category_name:list.category_name,
                      Quantity:list.Quantity,
                  };
             
                   }
                   
                   )
                   this.cartitemArrayWithoutkey=array;
                   this.listData=new MatTableDataSource(this.cartitemArray);
                  
            })
       

            this.itemAddservice.getoriginalquantities().subscribe(item=>{
              this.originalquantities=item;

            })

          }


// adding new or increasing the quantity of the cart
addto(item){
this.itemAddservice.Addtovoucher(item);
this.cartitemArray=[];
 }

// subtracting items from cart
subtractfromcart(item){
this.itemAddservice.subfromvoucher(item);
this.cartitemArray=[];

}
        


  displayedColumns: string[] = ['Category','Addition'];

  onSubmit(form: NgForm){
   this.itemAddservice.confirmaddition({
    Voucher_Id:form.value.voucherNo,
    Recieved_from:form.value.Recfrom,
    Date_Recieved:form.value.createdate.toDateString(),
    items:this.cartitemArrayWithoutkey,
      } );

      for(let i=0;i<this.cartitemArray.length;i++){
        for(let j=0;j<this.originalquantities.length;j++){
          if(this.cartitemArray[i].category_name==this.originalquantities[j].category_name){
            let updateditem={$key:this.cartitemArray[i].$key,
              category_name:this.originalquantities[j].category_name,Quantity:(this.originalquantities[j].Quantity+this.cartitemArray[i].Quantity)}
            console.log(updateditem);
            this.updatedQuantities.push(updateditem);
          }
        }
      }

  
  
      
     this.itemAddservice.updateoriginalQuantities(this.updatedQuantities)
      console.log(this.updatedQuantities)
 
  this.updatedQuantities=[];

   this.clearvoucart();
  }
  clearvoucart(){
    this.itemAddservice.clearvouchercart();
    this.cartitemArray=[];
  }

  test(){


    //  console.log(this.cartitemArray);


  }

}
