import { Component, OnInit } from '@angular/core';
import { LendingServiceService } from 'src/app/services/lending-service.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-past-lendings',
  templateUrl: './past-lendings.component.html',
  styleUrls: ['./past-lendings.component.css']
})
export class PastLendingsComponent implements OnInit {

  lendings:any=[]
  lendingsUnchanged:any=[]
  constructor(private LendingsService:LendingServiceService,private teacherService:TeacherService) { }

  ngOnInit() {
    this.LendingsService.getPastLending().subscribe(item=>{
      this.lendings=item
      this.lendingsUnchanged= item;
      this.lendings = item;
      console.log(item);
 
      let teacherName=null;
      this.teacherService.getteacherbyid

      
      

      this.lendings = this.lendingsUnchanged.map(item =>{ 
        let teacherName=this.teacherService.getteacherbyidloadash(item.teacherId)
   
       return {
         id:item.id,
        date: item.date,
        status: item.status,
        teacherName:teacherName,
        teacherId:item.teacherId,
        duration:item.duration,
        measurement:item.measurement,
        time:item.time,
        timeResolved:item.timeResolved,
        dateResolved:item.dateResovled,
        items:item.items,
  
        
          
        // approved: item.approve=="no" ? "Un Approved":"Approved",
      }
      
    })
    console.log(this.lendings);
    })
  
  }

  

}
