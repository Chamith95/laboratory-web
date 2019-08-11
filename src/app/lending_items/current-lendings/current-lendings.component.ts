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
 
      let teacherName=null;
      this.teacherService.getteacherbyid

      
      

      this.lendings = this.lendingsUnchanged.map(item =>{ 
        let teacherName=this.teacherService.getteacherbyidloadash(item.teacherId)
   
       return {
         id:item.timestamp,
        date: item.date,
        status: item.status,
        teacherName:teacherName,
        teacherId:item.teacherId,
        duration:item.duration,
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

  


