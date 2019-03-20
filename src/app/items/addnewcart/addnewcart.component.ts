import { Component, OnInit } from '@angular/core';
import { ItemAdditionService } from 'src/app/services/item-addition.service';
import { DataSource } from '@angular/cdk/table';
import { ShowOnDirtyErrorStateMatcher, MatTableDataSource } from '@angular/material';
import { NgForm } from '@angular/forms';




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

 

  constructor(private itemAddservice:ItemAdditionService) {
    
   }

  ngOnInit() {
    let cart$=this.itemAddservice.getvouchersync()
            .subscribe(item =>{
              const newObj: any = item;
                  console.log(newObj)
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
                    //  console.log(array)
                   this.listData=new MatTableDataSource(this.cartitemArray);
                  //  return this.ELEMENT_DATA
            })
       

          }



addto(item){
//  console.log(item);
this.itemAddservice.Addtovoucher(item);
this.cartitemArray=[];
 }
subtractfromcart(item){
this.itemAddservice.subfromvoucher(item);
this.cartitemArray=[];
}
        


  displayedColumns: string[] = ['Category','Addition'];

  onSubmit(form: NgForm){
   this.itemAddservice.confirmaddition({
    Voucher_Id:form.value.voucherNo,
    Recieved_from:form.value.Recfrom,
    Date_Recieved:form.value.createdate,
    items:this.cartitemArrayWithoutkey,
      } );
   
 
  // let a={ Voucher_Id:form.value.voucherNo,
  //    Recieved_from:form.value.Recfrom,
  //    Date_Recieved:form.value.createdate,
  //    items:this.cartitemArray,
  // }
  // console.log(a);
  this.clearvoucart();
  }
  clearvoucart(){
    this.itemAddservice.clearvouchercart();
    this.cartitemArray=[];
  }

}
