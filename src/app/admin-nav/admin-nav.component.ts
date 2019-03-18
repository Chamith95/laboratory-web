import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit,OnDestroy {
  navisAuth:boolean;
  authSubcription:Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,private authservice:AuthService) {
    
  }

  ngOnInit(){
    this.authSubcription=this.authservice.authChange.subscribe(status => {
      this.navisAuth=status;
      console.log(status)
    })
  }

  ngOnDestroy(){
    this.authSubcription.unsubscribe();
  }

}
