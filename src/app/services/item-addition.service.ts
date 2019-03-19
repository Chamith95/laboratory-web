import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {Subject} from 'rxjs';
import { first, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemAdditionService {
 


  constructor(private db:AngularFireDatabase) { 

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
    let item$=this.getItem(AddvoucherId,item1.$key)
    item$.valueChanges().pipe(take(1)).subscribe(item =>{
    //  console.log(item)
      // item$.update({ item: item, quantity:(item.quantity || 0) + 1 });
      const newObj: any = item;
      if(item!=null){
        item$.update({item:{category_name:item1.category_name,Quantity:item1.Quantity},Quantity:(newObj.Quantity)+1});
      }else{
        console.log(item)
        item$.set({item:{category_name:item1.category_name,Quantity:item1.Quantity},Quantity:1});
      }
    })
  }

  async subfromvoucher(item1){
    let AddvoucherId=await this.getOrCreateAddVoucherId();
    let item$=this.getItem(AddvoucherId,item1.$key)
    item$.valueChanges().pipe(take(1)).subscribe(item =>{
    //  console.log(item)
      // item$.update({ item: item, quantity:(item.quantity || 0) + 1 });
      const newObj: any = item;
      if(item!=null){
        item$.update({item:{category_name:item1.category_name,Quantity:item1.Quantity},Quantity:(newObj.Quantity)-1});
      }else{
        console.log(item)
        item$.set({item:{category_name:item1.category_name,Quantity:item1.Quantity},Quantity:1});
      }
    })
  }
}
