import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'
import { AuthService } from "../../services/auth.service";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  username='';
  password='';

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.authService.SignIn(this.username,this.password)
  }

}
