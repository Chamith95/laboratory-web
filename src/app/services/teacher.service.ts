import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { UiService } from './ui.service';

import * as _ from "lodash"

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  array:any=[];
  constructor(private firebase: AngularFireDatabase,private uiservice:UiService) {
    this.selectedteacherList = this.firebase.list('Users');
    this.selectedteacherList.snapshotChanges().subscribe(
      list=>{
        this.array=list.map(item =>{
          return {
            $key:item.key,
            ...item.payload.val()
          }
        })
        console.log(this.array)
     
      }
    
    )
   }


  teacherList: AngularFireList<any>;
  selectedteacherList: AngularFireList<any>;

  getteaches() {
    this.teacherList = this.firebase.list('Users');

    return this.teacherList.valueChanges();
  }

  getteacherbyid(id){
    this.selectedteacherList = this.firebase.list('/Users',ref => ref.orderByChild('id').equalTo(id));
    return this.selectedteacherList.valueChanges();
  }

  getteacherbyidloadash($key){
    return _.find(this.array,(obj) =>{return obj.$key ==$key})['username'];
  }


  approve(id){
    this.teacherList.update(id, {
      approve:"yes",
    })

    this.uiservice.showSnackbar("Approved", null, 3000);

  }

  Unapprove(id){
    this.teacherList.update(id, {
      approve:"no",
    })

    this.uiservice.showSnackbar("Un Approved", null, 3000);

  }

}
