import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { take } from 'rxjs/operators';
import { remvoucher } from './remvoucher.model';

@Injectable({
  providedIn: 'root'
})
export class ItemRemovalService {

  removalcartlist: AngularFireList <any> 
  glasswarelist: AngularFireList <any>;

  constructor(private db:AngularFireDatabase,private firebase:AngularFireDatabase) { 
    this.removalcartlist = db.list('RemoveVouchers');
    this.glasswarelist=this.firebase.list('glassware');
  }

  private newRemovalCart(){
    return this.db.list('/new-removal-cart').push({
       dateTimeCreated:new Date().getTime()
     })
   }

   private async getOrCreateRemovalCartId():Promise<string>{
    let Removalcartid=localStorage.getItem('Removalcartid');
    if(Removalcartid)  return Removalcartid;
    let result=await this.newRemovalCart();
    localStorage.setItem('Removalcartid',result.key);
    return result.key;

  }

  async  getRemovecart(){
    let Removalcartid= await this.getOrCreateRemovalCartId();
    return this.db.object('/new-removal-cart/' +Removalcartid).valueChanges();
  }



  async AddtoRemovecartfromdialog(item1,dQuantity){
    let Removalcartid=await this.getOrCreateRemovalCartId();
    let item$=this.getItem(Removalcartid,item1.$key )
    item$.valueChanges().pipe(take(1)).subscribe(item =>{
      const newObj: any = item;
      if(item!=null){
        item$.update(
          {item_name:item1.item_name,
            category:item1.category,
          Quantity:dQuantity});
      }else{
         item$.set({item_name:item1.item_name,
          category:item1.category,
          Quantity:dQuantity});
      }
    })
  }

  private getItem(Removalcartid:string,itemId:string){
    return this.db.object('/new-removal-cart/' +Removalcartid +'/items/' +itemId );
   }


   async addtoRemovecart(item1){
    let Removalcartid=await this.getOrCreateRemovalCartId();
    let item$=this.getItem(Removalcartid,item1.$key )
    item$.valueChanges().pipe(take(1)).subscribe(item =>{

      const newObj: any = item;
      if(item!=null){
        item$.update(
          {item_name:item1.item_name,
            category:item1.category,
          Quantity:(newObj.Quantity)+1});
      }else{
         item$.set({item_name:item1.item_name,
          category:item1.category,
          Quantity:1});
      }
    })
  }

  async subfromRemovecart(item1){
    console.log(item1);
    let Removalcartid=await this.getOrCreateRemovalCartId();
    let item$=this.getItem(Removalcartid,item1.$key)
    item$.valueChanges().pipe(take(1)).subscribe(item =>{
   
      const newObj: any = item;
      if(newObj.Quantity==1){
         this.db.object('/new-removal-cart/' + Removalcartid + '/items/' + item1.$key).remove();
         return
      }
      if(item!=null){
        item$.update(
          {item_name:item1.item_name,
            category:item1.category,
          Quantity:(newObj.Quantity)-1});
      }else{
         item$.set({item_name:item1.item_name,
          category:item1.category,
          Quantity:1});
      }
    })
  }

  // clearing the cart in database
  async clearRemovecart(){
    let Removalcartid = await this.getOrCreateRemovalCartId();
    this.db.object('/new-removal-cart/' + Removalcartid + '/items').remove();
}

confirmaddition(vocuher:remvoucher){
  console.log(this.removalcartlist);
  this.removalcartlist.push({
    Voucher_Id: vocuher.Voucher_Id,
    Reason:vocuher.Reason,
    Date_Removed:vocuher.Date_Removed.toString(),
    items:vocuher.items
  });
}

  // Getting original quantities in order to update
  getoriginalquantities(){
    this.glasswarelist=this.firebase.list('glassware');
    return this.glasswarelist.valueChanges();
  }

  updateoriginalQuantities(data){
    console.log(data[0].$key)
    for(let i=0;i<data.length;i++){
      this.glasswarelist.update(
        data[i].$key,{
        item_name: data[i].item_name,
        Quantity:data[i].Quantity
      })
    }
  }

  getRemvouchers(){
    this.removalcartlist=this.db.list('RemoveVouchers');
    return this.removalcartlist.valueChanges();
  }
}
