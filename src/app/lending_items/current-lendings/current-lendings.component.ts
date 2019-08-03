import { Component, OnInit } from '@angular/core';
import { LendingServiceService } from 'src/app/services/lending-service.service';
import { map } from 'rxjs/operators';
import { TeacherService } from 'src/app/services/teacher.service';
import * as _ from 'lodash';

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
      console.log(typeof this.lendingsUnchanged)
 
      let teacherName=null;
      this.teacherService.getteacherbyid
      console.log(this.lendings);
      
      

      this.lendings = this.lendingsUnchanged.map(item =>{ 
     
        let teacherName=this.teacherService.getteacherbyidloadash(item.teacherId)
        console.log(teacherName)
       return {
        // id:item.id,
      
        date: item.date,
        status: item.status,
        teacherName:teacherName, 
        time:item.time
        
          
        // approved: item.approve=="no" ? "Un Approved":"Approved",
      }
    })
      console.log(this.lendings);
    })
  }




}

  


