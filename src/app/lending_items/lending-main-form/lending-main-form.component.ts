import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface Teacher {
  name: string;
  Gender: string;
}

@Component({
  selector: 'app-lending-main-form',
  templateUrl: './lending-main-form.component.html',
  styleUrls: ['./lending-main-form.component.css']
})
export class LendingMainFormComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

   planModel: any = { start_time: new Date() };

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['',]
    });
  }

   today: number = Date.now();
  // teachers
  Teachers: Teacher[] = [
    {name: 'Teacher 1', Gender: 'Female'},
    {name: 'Teacher 2', Gender: 'Male'},
    {name: 'Teacher 3', Gender: 'Female'}
  ];
}
