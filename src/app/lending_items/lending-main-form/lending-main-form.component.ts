import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,ReactiveFormsModule } from '@angular/forms';
import { LendingServiceService } from 'src/app/services/lending-service.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { AvailableItemsService } from 'src/app/services/available-items.service';
import { UiService } from 'src/app/services/ui.service';
import { LendingquantitydialogComponent } from '../lendingquantitydialog/lendingquantitydialog.component';
import { ItemService } from 'src/app/services/glassware.service';
import { ChemicalsService } from 'src/app/services/chemicals.service';
import { PerishablesService } from 'src/app/services/perishables.service';
import { PermEquipmentService } from 'src/app/services/perm-equipment.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { identifierModuleUrl } from '@angular/compiler';
import { min } from 'rxjs/operators';

export interface Teacher {
  id:String,
  name: String,
  email: String,
  phoneNo: String, 
  approved: String,
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
  updatedtablearry:any[]=[];
  quantity: number;
  selectedTeacher:any;
  selectedTeacherOption:any;

  availableglassware:any[]=[];
  availableChemical:any[]=[];
  availablePerishables:any[]=[];
  availablePermEquipment:any[]=[];
  lendingcartitemarraywithoutkey:any[]=[];
  listData: MatTableDataSource<any>;
  dataavailableflag:boolean;

    // teachers
    Teachers: Teacher[] = [
    ];
  


   planModel: any = { start_time: new Date() };

  constructor(private _formBuilder: FormBuilder,
    private itemlendingservice:LendingServiceService,
    private availableservice:AvailableItemsService,
    private glasswareService:ItemService,
    private chemicalService:ChemicalsService,
    private pershablesService:PerishablesService,
    private permEquipService:PermEquipmentService,
    private teacherService:TeacherService,
    private dialog: MatDialog,
    private uiservice:UiService) {}

  async ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['',]
    });
    this.thirdFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      duration: ['', [Validators.required,Validators.min(1),Validators.max(12)]]
    });


    // Getting teachers
    this.teacherService.getteaches().subscribe(teachers=>{
    this.Teachers = teachers.map(item => ({
      id:item.id,
      name: item.username,
      email: item.email,
      phoneNo: item.phoneNumber, 
      approved: item.approve=="no" ? "Un Approved":"Approved",
    }))

    // console.log(this.event2);
  })
    

    let cart$ = this.itemlendingservice.getlendingsync()
    .subscribe(item => {
 
      // console.log(this.updatedtablearry);
      const newObj: any = item;
       console.log(item);
      //checking if cart is empty
      if (newObj!= undefined) {
        this.iscartnotempty = true;
       
      } else {
        this.iscartnotempty = false;
        return
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
   

      this.glasswareService.getGlasswareitems().subscribe(item=>{
      
        this.availableglassware=item;
        // console.log(this.lendingcartarray)
        for(let i=0;i<this.lendingcartarray.length;i++){
     
        if(this.lendingcartarray[i].category=="Glassware"){
            for(let j=0;j<item.length;j++){
              if(this.lendingcartarray[i].item_name==item[j].item_name){
                let updatedtableobject = {
                  $key: this.lendingcartarray[i].$key,
                  item_name: item[j].item_name,
                  category: item[j].category,
                  measurement: item[j].measurement,
                  availablequantity:item[j].Quantity,
                  Quantity: (this.lendingcartarray[i].Quantity)
                }
                this.updatedtablearry.push(updatedtableobject);
                     
        }
      }
        }
        }
       
      })

      this.pershablesService.getperishablesitems().subscribe(item=>{
      
        // console.log(this.lendingcartarray)
        for(let i=0;i<this.lendingcartarray.length;i++){
     
        if(this.lendingcartarray[i].category=="Perishables"){
            for(let j=0;j<item.length;j++){
              if(this.lendingcartarray[i].item_name==item[j].item_name){
                let updatedtableobject = {
                  $key: this.lendingcartarray[i].$key,
                  item_name: item[j].item_name,
                  category: item[j].category,
                  measurement: item[j].measurement,
                  availablequantity:item[j].Quantity,
                  Quantity: (this.lendingcartarray[i].Quantity)
                }
                this.updatedtablearry.push(updatedtableobject);
                     
        }
      }
        }
        }
       
      })

      this.permEquipService.getpermenant_equipmentitems().subscribe(item=>{
      
        this.availableglassware=item;
        // console.log(this.lendingcartarray)
        for(let i=0;i<this.lendingcartarray.length;i++){
     
        if(this.lendingcartarray[i].category=="Permanent Equipment"){
            for(let j=0;j<item.length;j++){
              if(this.lendingcartarray[i].item_name==item[j].item_name){
                let updatedtableobject = {
                  $key: this.lendingcartarray[i].$key,
                  item_name: item[j].item_name,
                  category: item[j].category,
                  measurement: item[j].measurement,
                  availablequantity:item[j].Quantity,
                  Quantity: (this.lendingcartarray[i].Quantity)
                }
                this.updatedtablearry.push(updatedtableobject);
                     
        }
      }
        }
        }
       
      })
      // console.log(this.updatedtablearry);

      this.chemicalService.getChemicalItems().subscribe(item=>{
        this.availableglassware=item;
        // console.log(this.lendingcartarray)
        for(let i=0;i<this.lendingcartarray.length;i++){
     
        if(this.lendingcartarray[i].category=="Chemicals"){
       
            for(let j=0;j<item.length;j++){
              if(this.lendingcartarray[i].item_name==item[j].item_name){
                let updatedtableobject = {
                  $key: this.lendingcartarray[i].$key,
                  item_name: item[j].item_name,
                  category: item[j].category,
                  measurement: item[j].measurement,
                  availablequantity:item[j].Quantity,
                  Quantity: (this.lendingcartarray[i].Quantity)
                }
                this.updatedtablearry.push(updatedtableobject); 
         
        }
      }
     
        }
        }
        console.log(this.updatedtablearry);
        this.listData = new MatTableDataSource(this.updatedtablearry);
      
      })

      this.itemlendingservice.getlendingsync().subscribe(item=>{


      })

      
      
      if (this.lendingcartarray.length > 0) {
        this.dataavailableflag = true;
      }
      //  console.log(this.lendingcartarray);
    })
// adding available quantities to the array


     console.log(this.availableglassware);

    
    
  }

    //  Quantity dialog
    openDialog(item): void {

      const dialogRef = this.dialog.open(LendingquantitydialogComponent, {
        width: '250px',
        data: { Quantity: this.quantity }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.quantity = result;
  //  console.log(item.Quantity)
          if (this.quantity) {
            this.itemlendingservice.Addtocartfromdialog(item, this.quantity)
          }
          else{
            this.uiservice.showSnackbar("Cant lend more than available",null,3000);
          }
          this.updatedtablearry = [];
          this.lendingcartarray=[];
          this.quantity = undefined;
        }
      )
        ;
    }

    // Getting the selected teachers value
    changeClient(value) {
      
      this.teacherService.getteacherbyid(value).subscribe(item=>{
        this.selectedTeacher={id:item[0].id,
          name: item[0].username,
          email: item[0].email,
          phoneNo: item[0].phoneNumber, 
          approved: item[0].approve=="no" ? "Un Approved":"Approved",
      }
      // this.selectedTeacherOption= this.selectedTeacher.id;
      console.log(this.selectedTeacher);
  })
 
}


  displayedColumns: string[] = ['item_name', 'AvailableQuantity', 'lendquantity'];

   today: any = Date.now();


  addto(item) {
    this.itemlendingservice.Addtolendingcart(item);
    this.updatedtablearry = [];
    this.lendingcartarray=[];
  }

  // subtracting items from cart
  subtractfromcart(item) {
    this.itemlendingservice.subfromlendingcart(item);
    this.updatedtablearry = [];
    this.lendingcartarray=[];
    console.log(this.updatedtablearry);

  }

  onQuantitysubmit(){
    console.log("submitted")
    this.updatedtablearry = [];
    this.lendingcartarray=[]; 
    this.listData=null;
  }

  onQuantitysubmit2(){
    console.log("submitted2")
    this.updatedtablearry = [];
    this.lendingcartarray=[]; 

  }

  OnSubmit(){

    let array = this.lendingcartitemarraywithoutkey.map(list => {
      return {
        item_name: list.item_name,
        category: list.category,
        measurement: list.measurement,
        Quantity: list.Quantity,
      };

    });
    let datenow = this.planModel.start_time;

    let date = datenow.getDate();
    let month = datenow.getMonth(); //Be careful! January is 0 not 1
    let year = datenow.getFullYear();
    
    let dateString = date + "/" +(month + 1) + "/" + year;

    

    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
   let newlending={
     teacherId:this.selectedTeacher.id,
     date:dateString,
     timestamp:this.today,
     time:time,
     duration:this.thirdFormGroup.get('duration').value,
     items:array
 
   } 
   console.log(newlending);
   this.itemlendingservice.submitlending(newlending);
  }
}
