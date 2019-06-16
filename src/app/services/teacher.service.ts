import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private firebase: AngularFireDatabase,private uiservice:UiService) { }


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
