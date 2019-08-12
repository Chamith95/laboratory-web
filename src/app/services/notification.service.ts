import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  RemindNotificationlist: AngularFireList<any>;
  ResolveNotificationlist: AngularFireList<any>;
  Ritems: Observable<any[]>;

  constructor(private firebase: AngularFireDatabase,private uiService:UiService) {
    this.RemindNotificationlist = firebase.list("RemindNotification")
    this.Ritems = this.RemindNotificationlist.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

   }

   createRemindNotification(reciever_id){
    let f= this.firebase.list('/RemindNotification/'+reciever_id);
    this.uiService.showSnackbar("A notification has been sent To the user's mobile",null,30000);
   return f.push({
      from:"admin",
      message:"test",
      type:"request"
    });
  }

    
    createResolveNotification(reciever_id){
      let f= this.firebase.list('/ResolveNotification/'+reciever_id);
      // this.uiService.showSnackbar("A notification has been sent To user's mobile",null,30000);
     return f.push({
        from:"admin",
        message:"lending Resolved",
        type:"request"
      });   
   }


   createAcceptedNotification(reciever_id){
    let f= this.firebase.list('/AcceptedNotification/'+reciever_id);
    // this.uiService.showSnackbar("A notification has been sent To user's mobile",null,30000);
   return f.push({
      from:"admin",
      message:"lending Resolved",
      type:"request"
    });   
 }

  //  private RemindNotification(reciever_id: string, itemId: string) {
  //   return this.db.object('/new-removal-cart/' + reciever_id + '/items/' + itemId);
  // }

  }

