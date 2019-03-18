import { Component, OnInit,NgZone, OnDestroy } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  public IsSignedIn=false;
  authSubscription:Subscription;

  constructor(public authService: AuthService,private route : ActivatedRoute) { 
  

  }

  ngOnInit() {
   this.authSubscription=this.authService.authChange.subscribe(authstatus => {
     this.IsSignedIn=authstatus;
   })
    

  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }

}
