import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { take, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LendingServiceService {

  lendinglist: AngularFireList<any>
  Pastlendinglist: AngularFireList<any>
  glasswarelist: AngularFireList<any>;
  chemicalist: AngularFireList<any>;
  perishablelist: AngularFireList<any>;
  permEquiplist: AngularFireList<any>;
  pastLendings:AngularFireList<any>
  user:any;
  uid:any;
  items: Observable<any[]>;

  constructor(private firebase: AngularFireDatabase, private afauth:AngularFireAuth,) {
    this.lendinglist = firebase.list('lendings');
    this.glasswarelist = this.firebase.list('glassware');
    this.chemicalist = this.firebase.list('chemicals');
    this.permEquiplist = this.firebase.list('permenant_equipment');
    this.perishablelist = this.firebase.list('perishables');
    this.pastLendings=this.firebase.list('past_lendings')
    
    this.user=JSON.parse(localStorage.getItem('user'));
    if(this.user){
      this.uid=(this.user.uid);
    }
  
    if(!this.uid){
    this.afauth.authState.subscribe(user => {
      if (user) {
        this.uid=user.uid
      } else {
        this.uid=null;
      }
    })
  }

  this.items = this.lendinglist.snapshotChanges().pipe(
    map(changes => 
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    )
  );
   }




  getlendingsync(){
    return this.firebase.object('/new-lendings-cart/' + this.uid).valueChanges()
  }

  getCurrentlendingsync(){
    return this.firebase.list('lendings').valueChanges()
  }

  getPastLending(){
    return this.firebase.list('past_lendings').valueChanges()
  }

  getCurrentlendingsnap(){
    return this.firebase.list('lendings').snapshotChanges()
  }

  removelendingscart(){
    return this.firebase.object('/new-lendings-cart/' + this.uid).remove()
  }

  deletecurrentLending(key){
   this.lendinglist.remove(key);
  }



  // Getting item
  private getItem(lendingcartid: string, itemId: string) {
    return this.firebase.object('/new-lendings-cart/' + lendingcartid + '/items/' + itemId);
  }
  // Adding new item or increasing count
  async Addtolendingcart(item1) {
    let lendingcartid = this.uid;
    let item$ = this.getItem(lendingcartid, item1.$key)
    item$.valueChanges().pipe(take(1)).subscribe(item => {

      const newObj: any = item;
      if (item != null) {
        item$.update(
          {
            item_name: item1.item_name,
            category: item1.category,
            measurement: item1.measurement,
            Quantity: (newObj.Quantity) + 1
          });
      } else {
        item$.set({
          item_name: item1.item_name,
          category: item1.category,
          measurement: item1.measurement,
          Quantity: 1
        });
      }
    })
  }

  // adding to cart from the quantity dialog box
  async Addtocartfromdialog(item1, dQuantity) {
    let lendingcartid = this.uid;
    let item$ = this.getItem(lendingcartid, item1.$key)
    item$.valueChanges().pipe(take(1)).subscribe(item => {

      const newObj: any = item;
      if (item != null) {
        item$.update(
          {
            item_name: item1.item_name,
            category: item1.category,
            measurement: item1.measurement,
            Quantity: dQuantity
          });
      } else {
        item$.set({
          item_name: item1.item_name,
          category: item1.category,
          measurement: item1.measurement,
          Quantity: dQuantity
        });
      }
    })
    // this.uiService.showSnackbar(dQuantity + " " + "'" + item1.item_name + "'" + " items" + " Added to pending Arrivals", null, 3000);
  }

  // subtracting or removing items form cart
  async subfromlendingcart(item1) {
    let lendingcartid =this.uid;
    let item$ = this.getItem(lendingcartid, item1.$key)
    item$.valueChanges().pipe(take(1)).subscribe(item => {

      const newObj: any = item;
  
      if (newObj.Quantity == 1) {
        this.firebase.object('/new-lendings-cart/' + lendingcartid + '/items/' + item1.$key).remove();
        return
      }
      if (item != null) {
        item$.update(
          {
            item_name: item1.item_name,
            category: item1.category,
            measurement: item1.measurement,
            Quantity: (newObj.Quantity) - 1
          });
      } else {
        item$.set({
          item_name: item1.item_name,
          category: item1.category,
          measurement: item1.measurement,
          Quantity: 1
        });
      }

    })
  }

  submitlending(lendVoucher){
    console.log(lendVoucher);
    this.lendinglist.push({
      teacherId:lendVoucher.teacherId,
      date:lendVoucher.date,
      time:lendVoucher.time,
      datetime:lendVoucher.datetime,
      timestamp:lendVoucher.timestamp,
      duration:lendVoucher.duration,
      status:"UnResolved",
      items:lendVoucher.items
    })

  }

  updateQuantities(data){
    console.log(data)
 
      if (data.category == "Glassware") {
        this.glasswarelist.update(
          data.$key, {
            Quantity: data.Quantity,
            available: data.available
          })
      }
      if (data.category == "Chemicals") {
        this.chemicalist.update(
          data.$key, {
            Quantity: data.Quantity,
            available: data.available
          })
      }

      if (data.category == "Perishables") {
        this.perishablelist.update(
          data.$key, {
            Quantity: data.Quantity,
            available: data.available
          })
      }

      if (data.category == "Permanent Equipment") {
        this.permEquiplist.update(
          data.$key, {
            Quantity: data.Quantity,
            available: data.available
          })
      }
    
  }

  


  updateavailableQuantities(data) {
    console.log(data)
    for (let i = 0; i < data.length; i++) {
      if (data[i].category == "Glassware") {
        this.glasswarelist.update(
          data[i].$key, {
            available: data[i].available
          })
      }
      if (data[i].category == "Chemicals") {
        this.chemicalist.update(
          data[i].$key, {
            available: data[i].available
          })
      }

      if (data[i].category == "Perishables") {
        this.perishablelist.update(
          data[i].$key, {
            available: data[i].available
          })
      }

      if (data[i].category == "Permanent Equipment") {
        this.permEquiplist.update(
          data[i].$key, {
            available: data[i].available
          })
      }
    }
  }

  updateallQuantitiesarry(data) {
    console.log(data)
    for (let i = 0; i < data.length; i++) {
      if (data[i].category == "Glassware") {
        this.glasswarelist.update(
          data[i].$key, {
            Quantity: data[i].Quantity,
            available: data[i].available
          })
      }
      if (data[i].category == "Chemicals") {
        this.chemicalist.update(
          data[i].$key, {
            Quantity: data[i].Quantity,
            available: data[i].available
          })
      }

      if (data[i].category == "Perishables") {
        this.perishablelist.update(
          data[i].$key, {
            Quantity: data[i].Quantity,
            available: data[i].available
          })
      }

      if (data[i].category == "Permanent Equipment") {
        this.permEquiplist.update(
          data[i].$key, {
            Quantity: data[i].Quantity,
            available: data[i].available
          })
      }
    }
  }


resolveLending(data){
  this.pastLendings.push(data);
}

}
