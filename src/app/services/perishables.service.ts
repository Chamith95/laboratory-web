import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { UiService } from './ui.service';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PerishablesService {

  items: Observable<any[]>;
  constructor(private firebase: AngularFireDatabase, private uiservice: UiService) {
    this.perishablelist = firebase.list("perishables")
    this.items = this.perishablelist.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

  }
  perishablelist: AngularFireList<any>;



  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    category: new FormControl(null),
    item_name: new FormControl('', Validators.required),
    Quantity: new FormControl(null),
    measurement: new FormControl(null),
  });


  getperishables() {
    this.perishablelist = this.firebase.list('perishables');
    return this.perishablelist.snapshotChanges();
  }


  getperishablesitems() {
    this.perishablelist = this.firebase.list('perishables');
    return this.perishablelist.valueChanges();
  }
  insertperishables(perishables) {
    console.log(this.perishablelist);
    this.perishablelist.push({
      category: "Perishables",
      item_name: perishables.item_name,
      Quantity: 0,
      measurement: "units",
    });

    //  this.uiservice.success(perishables.item_name + "Successfully Created");
      this.uiservice.showSnackbar(perishables.item_name + " Created", null, 3000);
  }

  updateperishables(perishables) {
    this.perishablelist.update(perishables.$key, {
      category: perishables.category,
      item_name: perishables.item_name,
      Quantity: perishables.Quantity
    })

    this.uiservice.showSnackbar("Updated to " + perishables.item_name, null, 3000);

  }

  deleteperishables($key: string, perishables) {
    if(perishables.Quantity>0){
      this.uiservice.showSnackbar(perishables.item_name + "Cannot be Deleted! make sure the quantity is zero", null, 3000);
    }
    else{
    this.perishablelist.remove($key);
    // console.log(this.perishablelist[$key]);
    this.uiservice.showSnackbar(perishables.item_name + " Succesfully Deleted ", null, 3000);
    }
  }

  // populating for edit
  populateForm(perishables) {
    this.form.setValue(perishables);
  }
}
