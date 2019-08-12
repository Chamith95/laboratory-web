import { Component, OnInit } from '@angular/core';
import { LendingServiceService } from 'src/app/services/lending-service.service';
import { map } from 'rxjs/operators';
import { TeacherService } from 'src/app/services/teacher.service';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material';
import { ResolveLendingDialogComponent } from '../resolve-lending-dialog/resolve-lending-dialog.component';

@Component({
  selector: 'app-current-lendings',
  templateUrl: './current-lendings.component.html',
  styleUrls: ['./current-lendings.component.css']
})
export class CurrentLendingsComponent implements OnInit {

  lendings: any = [];
  lendingsUnchanged: any=[];
  currentTeacher:any;
  constructor(private lendingService:LendingServiceService,private teacherService:TeacherService) { }

  async ngOnInit() {
    this.lendingService.getCurrentlendingsync().subscribe(item=>{
      this.lendingsUnchanged= item;
      this.lendings = item;
 
 
    

      
      

      this.lendings = this.lendingsUnchanged.map(item =>{ 
        console.log(item.teacherId);
        let teacherName=this.teacherService.getteacherbyidloadash(item.teacherId)
         let teacherGender=this.teacherService.getteachergenderbyidloadash(item.teacherId);
       return {
         id:item.timestamp,
        date: item.date,
        teacherName:teacherName,
         teacherGender:teacherGender,
        teacherId:item.teacherId,
        duration:item.duration,
        timestamp:item.timestamp,
        measurement:item.measurement,
        time:item.time,
        items:item.items
        
          
        // approved: item.approve=="no" ? "Un Approved":"Approved",
      }
    })
  
    })
  }

  onResolveLending(id){

    for(let i=0;i<this.lendings.length;i++){
 
      if(this.lendings[i].id==id){

        this.lendings.splice(i,1);
      }
    }
   
  }




}

  


