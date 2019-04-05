import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LendingServiceService } from 'src/app/services/lending-service.service';
import { MatTableDataSource } from '@angular/material';

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
  thirdFormGroup: FormGroup;
  iscartnotempty:boolean;
  lendingcartarray:any[]=[];
  lendingcartitemarraywithoutkey:any[]=[];
  listData: MatTableDataSource<any>;
  dataavailableflag:boolean;


   planModel: any = { start_time: new Date() };

  constructor(private _formBuilder: FormBuilder,
    private itemlendingservice:LendingServiceService) {}

  async ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['',]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['',]
    });

    let cart$ =(await this.itemlendingservice.getlendingcart()).valueChanges()
    .subscribe(item => {
      const newObj: any = item;
      console.log(item);
      //checking if cart is empty
      if (newObj.items != undefined) {
        this.iscartnotempty = true;
      } else {
        this.iscartnotempty = false;
      }
// getting and mapping cart items
      for (let item in newObj.items) {
        let obj = {
          $key: item,
          item_name: newObj.items[item].item_name,
          category: newObj.items[item].category,
          measurement: newObj.items[item].measurement,
          Quantity: newObj.items[item].Quantity
        }
  
        this.lendingcartarray.push(obj);

      }
      let array = this.lendingcartarray.map(list => {
        return {
          item_name: list.item_name,
          category: list.category,
          measurement: list.measurement,
          Quantity: list.Quantity,
        };

      }

      )
      this.lendingcartitemarraywithoutkey = array;
      console.log(this.lendingcartarray);
      this.listData = new MatTableDataSource(this.lendingcartarray);
      if (this.lendingcartarray.length > 0) {
        this.dataavailableflag = true;
      }
      // console.log(this.dataavailableflag);
    })
  }


  displayedColumns: string[] = ['item_name', 'AvailableQuantity', 'lendquantity'];

   today: number = Date.now();
  // teachers
  Teachers: Teacher[] = [
    {name: 'Teacher 1', Gender: 'Female'},
    {name: 'Teacher 2', Gender: 'Male'},
    {name: 'Teacher 3', Gender: 'Female'}
  ];


  addto(item) {
    this.itemlendingservice.Addtolendingcart(item);
    this.lendingcartarray = [];
  }

  // subtracting items from cart
  subtractfromcart(item) {
    this.itemlendingservice.subfromlendingcart(item);
    this.lendingcartarray = [];

  }
}
