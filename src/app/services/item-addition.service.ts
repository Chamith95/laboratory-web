import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import {Subject, Observable} from 'rxjs';
import { first, take, map } from 'rxjs/operators';
import { Addvoucher } from './addvoucher.model';

@Injectable({
  providedIn: 'root'
})
export class ItemAdditionService {

  vocucherlist: AngularFireList <any> 
  addvoucher: AngularFireObject<any>;
  glasswarelist: AngularFireList <any>;
  
  constructor(private db:AngularFireDatabase,private firebase:AngularFireDatabase) { 
    this.vocucherlist = db.list('Addvouchers');
    this.glasswarelist=this.firebase.list('glassware');

  }
// Creating a new vouchercart if no voucher is present
  private newvoucher(){
   return this.db.list('/new-additions').push({
      dateTimeCreated:new Date().getTime()
    })
  }
// Getting vouchercart asynchronously
  async  getvoucher(){
    let voucherid= await this.getOrCreateAddVoucherId();
    return this.db.object('/new-additions/' +voucherid)

  }

// Getting voucherid synchronously
  getvouchersync(){
    let Addvoucherid=localStorage.getItem('Addvoucherid');
    return this.db.object('/new-additions/' +Addvoucherid).valueChanges()
  }


// Getting exisiting vouchercartid or creating one
  private async getOrCreateAddVoucherId():Promise<string>{
    let Addvoucherid=localStorage.getItem('Addvoucherid');
    if(Addvoucherid)  return Addvoucherid;
    let result=await this.newvoucher();
    localStorage.setItem('Addvoucherid',result.key);
    return result.key;

  }
// Getting item
  private getItem(AddvoucherId:string,itemId:string){
   return this.db.object('/new-additions/' +AddvoucherId +'/items/' +itemId );
  }
// Adding new item or increasing count
  async Addtovoucher(item1){
    let AddvoucherId=await this.getOrCreateAddVoucherId();
    let item$=this.getItem(AddvoucherId,item1.$key )
    item$.valueChanges().pipe(take(1)).subscribe(item =>{

      const newObj: any = item;
      if(item!=null){
        item$.update(
          {category_name:item1.category_name,
          Quantity:(newObj.Quantity)+1});
      }else{
         item$.set({category_name:item1.category_name,
          Quantity:1});
      }
    })
  }

  async Addtocartfromdialog(item1,dQuantity){
    let AddvoucherId=await this.getOrCreateAddVoucherId();
    let item$=this.getItem(AddvoucherId,item1.$key )
    item$.valueChanges().pipe(take(1)).subscribe(item =>{

      const newObj: any = item;
      if(item!=null){
        item$.update(
          {category_name:item1.category_name,
          Quantity:dQuantity});
      }else{
         item$.set({category_name:item1.category_name,
          Quantity:dQuantity});
      }
    })
  }
  
// subtracting or removing items form cart
  async subfromvoucher(item1){
    let AddvoucherId=await this.getOrCreateAddVoucherId();
    let item$=this.getItem(AddvoucherId,item1.$key)
    item$.valueChanges().pipe(take(1)).subscribe(item =>{
   
      const newObj: any = item;
      if(newObj.Quantity==1){
         this.db.object('/new-additions/' + AddvoucherId + '/items/' + item1.$key).remove();
         return
      }
      if(item!=null){
        item$.update(
          {category_name:item1.category_name,
          Quantity:(newObj.Quantity)-1});
      }else{
 
         item$.set({category_name:item1.category_name,
          Quantity:1});
      }
    })
  }

  // Confirm submition
  confirmaddition(vocuher:Addvoucher){
    console.log(this.vocucherlist);
    this.vocucherlist.push({
      Voucher_Id: vocuher.Voucher_Id,
      Recieved_from:vocuher.Recieved_from,
      Date_Recieved:vocuher.Date_Recieved.toString(),
      items:vocuher.items
    });
  }

  // Getting original quantities in order to update
  getoriginalquantities(){
    this.glasswarelist=this.firebase.list('glassware');
    return this.glasswarelist.valueChanges();
  }

// clearing the cart in database
  async clearvouchercart(){
      let vouId = await this.getOrCreateAddVoucherId();
      this.db.object('/new-additions/' + vouId + '/items').remove();
  }

  // Get submitted vouchers
  getaddvouchers(){
    this.vocucherlist=this.db.list('Addvouchers');
    return this.vocucherlist.valueChanges();
  }
 
// Updating original quantities
  updateoriginalQuantities(data){
    console.log(data[0].$key)
    for(let i=0;i<data.length;i++){
      this.glasswarelist.update(
        data[i].$key,{
        category_name: data[i].category_name,
        Quantity:data[i].Quantity
      })
    }
  }
}

  



