import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import {Subscription} from 'rxjs';
import { ItemRemovalService } from '../services/item-removal.service';
import { ItemAdditionService } from '../services/item-addition.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit,OnDestroy {
  navisAuth:boolean;
  authSubcription:Subscription;
  remcartitemcount:number;
  addcartitemcount:number;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );


  constructor(private breakpointObserver: BreakpointObserver,
    private authservice:AuthService,
    private itemremservice:ItemRemovalService,
    private addItemservice:ItemAdditionService) {

  }

  async ngOnInit(){
    this.authSubcription=this.authservice.authChange.subscribe(status => {
      this.navisAuth=status;
      console.log(status)
    })

    let cart1$=await this.itemremservice.getRemovecart()
    cart1$.subscribe(cart=>{
     const newObj: any = cart;
     // console.log(newObj.items)
      this.remcartitemcount=0;
      if(cart){
    for(let itemid in newObj.items){
     this.remcartitemcount+=1;
    }
  }
    });

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
    this.authSubcription.unsubscribe();
  }

}

//expand list
export class ExpansionOverviewExample {
  panelOpenState = false;
}
