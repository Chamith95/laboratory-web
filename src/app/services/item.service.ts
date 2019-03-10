import { Injectable } from '@angular/core';
import {FormGroup,FormControl, Validators } from '@angular/forms';
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database'

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private firebase:AngularFireDatabase) {
  }
  glasswarelist: AngularFireList <any>;

  
  form:FormGroup =new FormGroup({
    $key:new FormControl(null),
    category_name:new FormControl('',Validators.required),
    Quantity:new FormControl('',Validators.required)
  });


  getGlassware(){
    this.glasswarelist=this.firebase.list('glassware');
    return this.glasswarelist.snapshotChanges();
  }
  
  insertGlassware(glassware){
    this.glasswarelist.push({
      category_name: glassware.category_name,
      Quantity: glassware.Quantity
    });
  }

  updateGlassware(glassware){
    this.glasswarelist.update(glassware.$key,{
      category_name: glassware.category_name,
      Quantity:glassware.Quantity
    })
  }

  deleteGlassware($key:string){
    this.glasswarelist.remove($key); 
  }

  // populating for edit
  populateForm(glassware){
    this.form.setValue(glassware);
  }
}


