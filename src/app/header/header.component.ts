import { Component, OnInit,NgZone, OnDestroy } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import { ItemAdditionService } from '../services/item-addition.service';
import { LendingServiceService } from '../services/lending-service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  public IsSignedIn=false;
  authSubscription:Subscription;
  addcartitemcount:number;
  lendings:any=[];
  overdueCount=0;

  constructor(public authService: AuthService,private lendingService:LendingServiceService,private route : ActivatedRoute,private addItemservice:ItemAdditionService) { 


  }
  today=Date.now()  
 async ngOnInit() {
   
   this.authSubscription=this.authService.authChange.subscribe(authstatus => {
     this.IsSignedIn=authstatus;
     
   })

   this.lendingService.getCurrentlendingsync().subscribe(item=>{
    this.lendings = item
    
    for(let i=0;i<this.lendings.length;i++){
      let addedhours2=this.lendings[i].timestamp+(this.lendings[i].duration*3600000)
        if(addedhours2<this.today){
          this.overdueCount+=1;
        }
     }
   }
   )

   let cart$=await this.addItemservice.getvoucher()
   cart$.valueChanges().subscribe(cart=>{
    const newObj: any = cart;
    // console.log(newObj.items)
     this.addcartitemcount=0;
     if(cart){
   for(let itemid in newObj.items){
    this.addcartitemcount+=1;
   }
  }
   });

  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }

}
