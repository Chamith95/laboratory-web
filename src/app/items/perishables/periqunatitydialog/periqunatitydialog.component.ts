import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { quantitydialog } from './quantity.model';

@Component({
  selector: 'app-periqunatitydialog',
  templateUrl: './periqunatitydialog.component.html',
  styleUrls: ['./periqunatitydialog.component.css']
})
export class PeriqunatitydialogComponent implements OnInit {

  constructor(
    public dialogref:MatDialogRef<PeriqunatitydialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: quantitydialog) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogref.close();
  }

}
