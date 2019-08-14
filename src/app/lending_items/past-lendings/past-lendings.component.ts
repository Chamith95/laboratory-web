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
  searchKey: string;
  Teachers:any=[];
  selectedTeacher:any;
  filterargs:any;
  constructor(private LendingsService:LendingServiceService,private teacherService:TeacherService) { }

  ngOnInit() {
    this.LendingsService.getPastLending().subscribe(item=>{
      this.lendings=item
      this.lendingsUnchanged= item;
      this.lendings = item;
      console.log(item);
 
      this.teacherService.getteaches().subscribe(teachers=>{
        this.Teachers = teachers.map(item => ({
          id:item.id,
          name: item.username,
          nameWithInitials:item.nameWithInitial,
          email: item.email,
          phoneNo: item.phoneNumber, 
          approved: item.approve=="no" ? "Un Approved":"Approved",
        }))
    
         console.log(this.Teachers);
      })

      
      

      this.lendings = this.lendingsUnchanged.map(item =>{ 
        let teacherName=this.teacherService.getteacherbyidloadash(item.teacherId)
        let teacherGender=this.teacherService.getteachergenderbyidloadash(item.teacherId);
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
        teacherGender:teacherGender,
        items:item.items,
  
        
          
        // approved: item.approve=="no" ? "Un Approved":"Approved",
      }
      
    })
    console.log(this.lendings);
    })
  
  }



  changeClient(value) {
      if(value=="all"){
        this.filterargs=null;
        return
      }
    this.teacherService.getteacherbyid(value).subscribe(item=>{
      this.selectedTeacher={id:item[0].id,
        name: item[0].username,
        nameWithInitials: item[0].nameWithInitial,
        email: item[0].email,
        phoneNo: item[0].phoneNumber, 
        approved: item[0].approve=="no" ? "Un Approved":"Approved",
    }
    // this.selectedTeacherOption= this.selectedTeacher.id;
    console.log(this.selectedTeacher);
    this.filterargs={teacherId:this.selectedTeacher.id}
})

}

}
