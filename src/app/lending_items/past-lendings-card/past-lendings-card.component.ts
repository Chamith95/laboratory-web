import { Component, OnInit, Input } from '@angular/core';
import { LendingServiceService } from 'src/app/services/lending-service.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'past-lendings-card',
  templateUrl: './past-lendings-card.component.html',
  styleUrls: ['./past-lendings-card.component.css']
})
export class PastLendingsCardComponent implements OnInit {


  displayedColumns: string[] = ['position','category', 'name','returnQuantity','reason'];
  dataSource: MatTableDataSource<any>;
  items:any=[];
  constructor(private lendingService:LendingServiceService) { }


  @Input() lending: any;
  ngOnInit() {
    console.log(this.lending)
    this.items=this.lending.items
    console.log(this.items)
    this.dataSource=this.items 
  }

}
