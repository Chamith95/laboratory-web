import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { UiService } from './ui.service';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PermEquipmentService {


  items: Observable<any[]>;
  constructor(private firebase: AngularFireDatabase, private uiservice: UiService) {
    this.permEquiplist = firebase.list("permenant_equipment")
    this.items = this.permEquiplist.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

  }
  permEquiplist: AngularFireList<any>;



  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    category: new FormControl(null),
    item_name: new FormControl('', Validators.required),
    Quantity: new FormControl(null),
    measurement: new FormControl(null),
    recomended:new FormControl(null),
    available:new FormControl(null)
  });


  getpermenant_equipment() {
    this.permEquiplist = this.firebase.list('permenant_equipment');
    return this.permEquiplist.snapshotChanges();
  }


  getpermenant_equipmentitems() {
    this.permEquiplist = this.firebase.list('permenant_equipment');
    return this.permEquiplist.valueChanges();
  }
  insertpermenant_equipment(permenant_equipment) {
    console.log(this.permEquiplist);
    this.permEquiplist.push({
      category: "Permanent Equipment",
      item_name: permenant_equipment.item_name,
      Quantity: 0,
      measurement: "units",
      recomended:permenant_equipment.recomended,
      available:0,
    });

    //  this.uiservice.success(permenant_equipment.item_name + "Successfully Created");
      this.uiservice.showSnackbar(permenant_equipment.item_name + " Created", null, 3000);
  }

  updatepermenant_equipment(permenant_equipment) {
    this.permEquiplist.update(permenant_equipment.$key, {
      category: permenant_equipment.category,
      item_name: permenant_equipment.item_name,
      Quantity: permenant_equipment.Quantity,
      recomended:permenant_equipment.recomended,
      available:permenant_equipment.available,
    })

    this.uiservice.showSnackbar("Updated to " + permenant_equipment.item_name, null, 3000);

  }

  deletepermenant_equipment($key: string, permenant_equipment) {
    if(permenant_equipment.Quantity>0){
      this.uiservice.showSnackbar(permenant_equipment.item_name + "Cannot be Deleted! make sure the quantity is zero", null, 3000);
    }
    else{
    this.permEquiplist.remove($key);
    // console.log(this.permEquiplist[$key]);
    this.uiservice.showSnackbar(permenant_equipment.item_name + " Succesfully Deleted ", null, 3000);
    }
  }

  // populating for edit
  populateForm(permenant_equipment) {
    this.form.setValue(permenant_equipment);
  }
}
