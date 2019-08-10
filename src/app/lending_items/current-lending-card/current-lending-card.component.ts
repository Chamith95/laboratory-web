import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { AvailableItemsService } from 'src/app/services/available-items.service';
import { ItemService } from 'src/app/services/glassware.service';
import { ChemicalsService } from 'src/app/services/chemicals.service';
import { PermEquipmentService } from 'src/app/services/perm-equipment.service';
import { PerishablesService } from 'src/app/services/perishables.service';
import { LendingServiceService } from 'src/app/services/lending-service.service';



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
  items:any=[];
  availableQuantityArray:any=[];
  glasswareArray:any=[];
  chemicalArray:any=[];
  perishableArray:any=[];
  updatedQuantities:any=[]
  permEquipArray:any=[];
  returnQuantity:any={}
  @Input() lending: any;
  constructor( private _formBuilder: FormBuilder,
    private availableService:AvailableItemsService,
    private lendingService:LendingServiceService,
    private glassWareService:ItemService,
    private chemicalService:ChemicalsService,
    private perishableService:PerishablesService,
    private permEquipService:PermEquipmentService) {

     }

  ngOnInit() {
    this.form = this._formBuilder.group({
      lendings: this._formBuilder.array([])
    });


    this.items=this.lending.items

    this.dataSource=this.items
    for(let i=0;i<this.lending.items.length;i++){
 
     this.returnQuantity[i]=
      this.lending.items[i].Quantity
    
      this.reasons[i]="Depleted"


      
   
      
   
    }
    // this.returnQuantity=this.items[0].Quantity
   
  }

  submit(){
    for(let i=0;i<this.lending.items.length;i++){
      //  console.log(this.lending.items[i])
      if(this.lending.items[i].Quantity ==this.returnQuantity[i]){
        this.updateallEqupiment(this.lending.items[i],this.returnQuantity[i])     
      }
    }
 

    
  }

  updateallEqupiment(Lendeditem,ReturnQuntity){
    if(Lendeditem.category=="Glassware"){
      this.updateglassware(Lendeditem,ReturnQuntity)
     }
     if(Lendeditem.category=="Chemicals"){
      this.updateChemicals(Lendeditem,ReturnQuntity)
     } 
     if(Lendeditem.category=="Perishables"){
      this.updateperishables(Lendeditem,ReturnQuntity)
     } 
     if(Lendeditem.category=="Permanent Equipment"){
      this.updatePermEquipment(Lendeditem,ReturnQuntity)
     }  
   
  }

  updateglassware(Lendeditem,ReturnQuntity){
    this.glassWareService.getGlassware().subscribe(
      list => {
        let array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
        this.glasswareArray=array;
        for(let j=0;j<this.glasswareArray.length;j++){
          if(Lendeditem.key==this.glasswareArray[j].$key){ 
              let obj={
                $key:this.glasswareArray[j].$key,
                Quantity:this.glasswareArray[j].Quantity-(Lendeditem.Quantity-ReturnQuntity),
                available:this.glasswareArray[j].available+ReturnQuntity,
                category:this.glasswareArray[j].category
              }
              console.log(obj);
              // this.lendingService.updateQuantities(obj)  
          }
        }
      })
  }

  updateChemicals(Lendeditem,ReturnQuntity){
    this.chemicalService.getChemical().subscribe(
      list => {
        let array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
        this.chemicalArray=array;
        for(let j=0;j<this.chemicalArray.length;j++){
          if(Lendeditem.key==this.chemicalArray[j].$key){ 
              let obj={
                $key:this.chemicalArray[j].$key,
                Quantity:this.chemicalArray[j].Quantity-(Lendeditem.Quantity-ReturnQuntity),
                available:this.chemicalArray[j].available+ReturnQuntity,
                category:this.chemicalArray[j].category
              }
              console.log(obj);
              // this.lendingService.updateQuantities(obj)  
          }
        }
      })
  }

  updateperishables(Lendeditem,ReturnQuntity){
    this.perishableService.getperishables().subscribe(
      list => {
        let array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
        this.perishableArray=array;
        for(let j=0;j<this.perishableArray.length;j++){
          if(Lendeditem.key==this.perishableArray[j].$key){ 
              let obj={
                $key:this.perishableArray[j].$key,
                Quantity:this.perishableArray[j].Quantity-(Lendeditem.Quantity-ReturnQuntity),
                available:this.perishableArray[j].available+ReturnQuntity,
                category:this.perishableArray[j].category
              }
              console.log(obj);
              // this.lendingService.updateQuantities(obj)  
          }
        }
      })
  }

  updatePermEquipment(Lendeditem,ReturnQuntity){
    this.permEquipService.getpermenant_equipment().subscribe(
      list => {
        let array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
        this.permEquipArray=array;
        for(let j=0;j<this.permEquipArray.length;j++){
          if(Lendeditem.key==this.permEquipArray[j].$key){ 
              let obj={
                $key:this.permEquipArray[j].$key,
                Quantity:this.permEquipArray[j].Quantity-(Lendeditem.Quantity-ReturnQuntity),
                available:this.permEquipArray[j].available+ReturnQuntity,
                category:this.permEquipArray[j].category
              }
              console.log(obj);
              // this.lendingService.updateQuantities(obj)  
          }
        }
      })
  }

  

}
