import { Component, OnInit, Input } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'teacher-cards',
  templateUrl: './teacher-cards.component.html',
  styleUrls: ['./teacher-cards.component.css']
})
export class TeacherCardsComponent implements OnInit {

  @Input() teacher: any;
  constructor(private teacherService:TeacherService,private NotificationService:NotificationService) { }

  ngOnInit() {
  }

  onApprove(id){
    console.log(this.teacher);
    this.teacherService.approve(id);
    this.NotificationService.createAcceptedNotification(this.teacher.id)
  }

  onUnApprove(id){
    this.teacherService.Unapprove(id);
  }
}
