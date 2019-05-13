import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { UiService } from './ui.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  items: Observable<any[]>;
  constructor(private firebase: AngularFireDatabase, private uiservice: UiService) {
    this.glasswarelist = firebase.list("glassware")
    this.items = this.glasswarelist.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

  }
  glasswarelist: AngularFireList<any>;



  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    category: new FormControl(null),
    item_name: new FormControl('', Validators.required),
    Quantity: new FormControl(null),
    measurement: new FormControl(null),
    recomended:new FormControl(null),
    available:new FormControl(null)
  });


  getGlassware() {
    this.glasswarelist = this.firebase.list('glassware');

    return this.glasswarelist.snapshotChanges();
  }


  getGlasswareitems() {
    this.glasswarelist = this.firebase.list('glassware');
    return this.glasswarelist.valueChanges();
  }
  insertGlassware(glassware) {
    console.log(this.glasswarelist);
    this.glasswarelist.push({
      category: "Glassware",
      item_name: glassware.item_name,
      Quantity: 0,
      measurement: "units",
      recomended:glassware.recomended,
      available:0,
    });

    //  this.uiservice.success(glassware.item_name + "Successfully Created");
      this.uiservice.showSnackbar(glassware.item_name + " Created", null, 3000);
  }

  updateGlassware(glassware) {
    this.glasswarelist.update(glassware.$key, {
      category: glassware.category,
      item_name: glassware.item_name,
      Quantity: glassware.Quantity,
      recomended:glassware.recomended,
      available:glassware.available,
    })

    this.uiservice.showSnackbar("Updated to " + glassware.item_name, null, 3000);

  }

  deleteGlassware($key: string, glassware) {
    if(glassware.Quantity>0){
      this.uiservice.showSnackbar(glassware.item_name + "Cannot be Deleted! make sure the quantity is zero", null, 3000);
    }
    else{
    this.glasswarelist.remove($key);
    // console.log(this.glasswarelist[$key]);
    this.uiservice.showSnackbar(glassware.item_name + " Succesfully Deleted ", null, 3000);
    }
  }

  // populating for edit
  populateForm(glassware) {
    this.form.setValue(glassware);
  }


}


