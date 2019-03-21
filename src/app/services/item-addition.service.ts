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

  
  constructor(private db:AngularFireDatabase) { 
    this.vocucherlist = db.list('Addvouchers');


  }

  private newvoucher(){
   return this.db.list('/new-additions').push({
      dateTimeCreated:new Date().getTime()
    })
  }

  async  getvoucher(){
    let voucherid= await this.getOrCreateAddVoucherId();

    return this.db.object('/new-additions/' +voucherid)

  }

  getvouchersync(){
    let Addvoucherid=localStorage.getItem('Addvoucherid');
    return this.db.object('/new-additions/' +Addvoucherid).valueChanges()
  }



  private async getOrCreateAddVoucherId():Promise<string>{
    let Addvoucherid=localStorage.getItem('Addvoucherid');
    if(Addvoucherid)  return Addvoucherid;
    let result=await this.newvoucher();
    localStorage.setItem('Addvoucherid',result.key);
    return result.key;

  }

  private getItem(AddvoucherId:string,itemId:string){
   return this.db.object('/new-additions/' +AddvoucherId +'/items/' +itemId );
  }

  async Addtovoucher(item1){
    let AddvoucherId=await this.getOrCreateAddVoucherId();
    let item$=this.getItem(AddvoucherId,item1.$key )
    item$.valueChanges().pipe(take(1)).subscribe(item =>{
    //  console.log(item)
      // item$.update({ item: item, quantity:(item.quantity || 0) + 1 });
      const newObj: any = item;
      if(item!=null){
        item$.update(
          {category_name:item1.category_name,
          Quantity:(newObj.Quantity)+1});
      }else{
        //  console.log(item)
         item$.set({category_name:item1.category_name,
          Quantity:1});
      }
    })
  }

  

  async subfromvoucher(item1){
    let AddvoucherId=await this.getOrCreateAddVoucherId();
    let item$=this.getItem(AddvoucherId,item1.$key)
    item$.valueChanges().pipe(take(1)).subscribe(item =>{
   
      // item$.update({ item: item, quantity:(item.quantity || 0) + 1 });
      const newObj: any = item;
      if(item!=null){
        item$.update(
          {category_name:item1.category_name,
          Quantity:(newObj.Quantity)-1});
      }else{
        //  console.log(item)
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
  let a={  Voucher_Id: vocuher.Voucher_Id,
    Recieved_from:vocuher.Recieved_from,
    Date_Recieved:vocuher.Date_Recieved,
    items:vocuher.items
  }
  console.log(a)
  }

  async clearvouchercart(){
      let vouId = await this.getOrCreateAddVoucherId();
      this.db.object('/new-additions/' + vouId + '/items').remove();
  }

  getaddvouchers(){
    this.vocucherlist=this.db.list('Addvouchers');
    return this.vocucherlist.valueChanges();
  }



}
