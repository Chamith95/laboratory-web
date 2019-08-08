import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'current-lending-card',
  templateUrl: './current-lending-card.component.html',
  styleUrls: ['./current-lending-card.component.css']
})
export class CurrentLendingCardComponent implements OnInit {
  displayedColumns: string[] = ['position','category', 'name', 'weight', 'symbol'];
  dataSource: MatTableDataSource<any>;
  form: FormGroup;
  users: any[] = [];
  public reasons : any = {};
  items:any=[]
  returnQuantity:any={}
  @Input() lending: any;
  constructor( private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this._formBuilder.group({
      lendings: this._formBuilder.array([])
    });


    this.items=this.lending.items
    console.log( "ss", this.items)
    this.dataSource=this.items
    for(let i=0;i<this.lending.items.length;i++){
      console.log(this.lending.items.length)
 
     this.returnQuantity[i]=
      this.lending.items[i].Quantity
    
      this.reasons[i]="Depleted"
     
      console.log(this.lending.items[i].Quantity)
    }
    // this.returnQuantity=this.items[0].Quantity
   
  }

  submit(){
    console.log(this.returnQuantity)
    console.log(this.reasons)

    
  }

  

}
