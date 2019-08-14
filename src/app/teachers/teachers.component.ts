import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../services/teacher.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  teachers: any = [];
  teachersUnchanged:any=[];

  constructor(private teacherService:TeacherService) { }

  ngOnInit() {
    this.teacherService.getteaches().subscribe(teachers=>{
        this.teachersUnchanged = teachers;
        console.log(typeof teachers)
      this.teachers = this.teachersUnchanged.map(item => ({
        id:item.id,
        name: item.username,
        nameWithInitials:item.nameWithInitial,
        imageUrl:item.imageURL,
        email: item.email,
        phoneNo: item.phoneNumber, 
        approved: item.approve=="no" ? "Un Approved":"Approved",
      }))
      console.log(this.teachers);
      // console.log(this.event2);
    })
  }



}
