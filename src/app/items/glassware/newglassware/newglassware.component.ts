import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms';


import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-newglassware',
  templateUrl: './newglassware.component.html',
  styleUrls: ['./newglassware.component.css']
})
export class NewglasswareComponent implements OnInit {

  constructor(private service:ItemService) { }

  ngOnInit() {
     this.service.getGlassware();
  }


  
  onSubmit(){
    if(this.service.form.valid){
       this.service.insertGlassware(this.service.form.value);
       this.service.form.reset();
      }
  }


}
