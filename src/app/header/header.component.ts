import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  IsSignedIn=null;

  constructor(public authService: AuthService,private route : ActivatedRoute) { 
    this.IsSignedIn=this.authService.isLoggedIn;
  }

  ngOnInit() {
    
  }

}
