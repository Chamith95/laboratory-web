import { Component, OnInit, Input } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'teacher-cards',
  templateUrl: './teacher-cards.component.html',
  styleUrls: ['./teacher-cards.component.css']
})
export class TeacherCardsComponent implements OnInit {

  @Input() teacher: any;
  constructor(private teacherService:TeacherService) { }

  ngOnInit() {
  }

  onApprove(id){
    this.teacherService.approve(id);
  }

  onUnApprove(id){
    this.teacherService.Unapprove(id);
  }
}
