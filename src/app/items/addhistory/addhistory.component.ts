import { Component, OnInit } from '@angular/core';
import { ItemAdditionService } from 'src/app/services/item-addition.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-addhistory',
  templateUrl: './addhistory.component.html',
  styleUrls: ['./addhistory.component.css']
})
export class AddhistoryComponent implements OnInit {

  constructor(private itemaddservice:ItemAdditionService) { }

  listData:MatTableDataSource<any>;
  vouchersarray:any[]=[];

  ngOnInit() {
    this.itemaddservice.getaddvouchers().subscribe(item=>{
      console.log(item);
      const newObj: any = item;
      for(let item in newObj.items){
        // let obj={category_name: newObj.items[item].category_name,Quantity: newObj.items[item].Quantity}
        // this.cartitemArray.push(obj);
       }
    })
  }

}
