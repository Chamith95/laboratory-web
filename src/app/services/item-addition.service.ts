import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Subject, Observable } from 'rxjs';
import { first, take, map } from 'rxjs/operators';
import { Addvoucher } from './addvoucher.model';
import { UiService } from './ui.service';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class ItemAdditionService  {

  vocucherlist: AngularFireList<any>
  glasswarelist: AngularFireList<any>;
  chemicalist: AngularFireList<any>;
  perishablelist: AngularFireList<any>;
  permEquiplist: AngularFireList<any>;
  user:any;
  uid:any;
  items: Observable<any[]>;
  voucherlist: AngularFireList<any>;




  constructor(private db: AngularFireDatabase,
    private afauth:AngularFireAuth,
    private firebase: AngularFireDatabase,
    private uiService: UiService) {
    this.vocucherlist = db.list('Addvouchers');
    this.glasswarelist = this.firebase.list('glassware');
    this.chemicalist = this.firebase.list('chemicals');


    this.user=JSON.parse(localStorage.getItem('user'));
    this.uid=(this.user.uid);
    if(!this.uid){
    this.afauth.authState.subscribe(user => {
      if (user) {
        this.uid=user.uid
      } else {
        this.uid=null;
      }
    })
  }
}

  // Creating a new vouchercart if no voucher is present
  private newvoucher() {
    return this.db.object('/new-additions-cart/'+this.uid);
  }

  // Getting vouchercart asynchronously
  async  getvoucher() {
    let voucherid = this.getOrCreateAddVoucherId();
    return this.db.object('/new-additions-cart/' + voucherid)

  }

  // Getting exisiting vouchercartid or creating one
  private  getOrCreateAddVoucherId() {
    let result =this.newvoucher();
     return this.uid;

  }
  // Getting item
  private getItem(AddvoucherId: string, itemId: string) {
    return this.db.object('/new-additions-cart/' + AddvoucherId + '/items/' + itemId);
  }
  // Adding new item or increasing count
  async Addtovoucher(item1) {
    let AddvoucherId = await this.getOrCreateAddVoucherId();
    let item$ = this.getItem(AddvoucherId, item1.$key)
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
    let AddvoucherId = await this.getOrCreateAddVoucherId();
    let item$ = this.getItem(AddvoucherId, item1.$key)
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
    this.uiService.showSnackbar(dQuantity + " " + "'" + item1.item_name + "'" + " items" + " Added to pending Arrivals", null, 3000);
  }

  // subtracting or removing items form cart
  async subfromvoucher(item1) {
    let AddvoucherId = await this.getOrCreateAddVoucherId();
    let item$ = this.getItem(AddvoucherId, item1.$key)
    item$.valueChanges().pipe(take(1)).subscribe(item => {

      const newObj: any = item;
      if (newObj.Quantity == 1) {
        this.db.object('/new-additions-cart/' + AddvoucherId + '/items/' + item1.$key).remove();
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

 async removeitem($key: string, item) {
    let AddvoucherId = await this.getOrCreateAddVoucherId();
    this.db.object('/new-additions-cart/' + AddvoucherId + '/items/' + $key).remove();
    // console.log(this.glasswarelist[$key]);
  }

  // Confirm submition
  confirmaddition(vocuher: Addvoucher) {
    console.log(vocuher.items);
    this.vocucherlist.push({
      Voucher_Id: vocuher.Voucher_Id,
      Recieved_from: vocuher.Recieved_from,
      Date_Recieved: vocuher.Date_Recieved.toString(),
      items: vocuher.items
    });
  }

  // Getting original quantities in order to update
  getoriginalglasswarequantities() {
    this.glasswarelist = this.firebase.list('glassware');
    return this.glasswarelist.valueChanges();
  }

  getoriginalchemicalquantities() {
    this.chemicalist = this.firebase.list('chemicals');
    return this.chemicalist.valueChanges();
  }

  getoriginalPerishableQuantities() {
    this.perishablelist = this.firebase.list('perishables');
    return this.perishablelist.valueChanges();
  }

  getoriginalpermEquipQuantities() {
    this.permEquiplist = this.firebase.list('permenant_equipment');
    return this.permEquiplist.valueChanges();
  }
  // clearing the cart in database
  async clearvouchercart() {
    let vouId = await this.getOrCreateAddVoucherId();
    this.db.object('/new-additions-cart/' + vouId + '/items').remove();
  }

  // Get submitted vouchers
  getaddvouchers() {
    this.vocucherlist = this.db.list('Addvouchers');
    return this.vocucherlist.valueChanges();
  }

  // Updating original quantities
  updateoriginalQuantities(data) {
    console.log(data)
    for (let i = 0; i < data.length; i++) {
      if (data[i].category == "Glassware") {
        this.glasswarelist.update(
          data[i].$key, {
            item_name: data[i].item_name,
            Quantity: data[i].Quantity
          })
      }
      if (data[i].category == "Chemicals") {
        this.chemicalist.update(
          data[i].$key, {
            item_name: data[i].item_name,
            Quantity: data[i].Quantity
          })
      }

      if (data[i].category == "Perishables") {
        this.perishablelist.update(
          data[i].$key, {
            item_name: data[i].item_name,
            Quantity: data[i].Quantity
          })
      }

      if (data[i].category == "Permanent Equipment") {
        this.permEquiplist.update(
          data[i].$key, {
            item_name: data[i].item_name,
            Quantity: data[i].Quantity
          })
      }
    }
  }
}





