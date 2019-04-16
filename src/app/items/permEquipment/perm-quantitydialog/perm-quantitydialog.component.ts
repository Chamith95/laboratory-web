import { Component, OnInit, Inject } from '@angular/core';
import { quantitydialog } from './quantity.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-perm-quantitydialog',
  templateUrl: './perm-quantitydialog.component.html',
  styleUrls: ['./perm-quantitydialog.component.css']
})
export class PermQuantitydialogComponent implements OnInit {

  constructor(
    public dialogref:MatDialogRef<PermQuantitydialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: quantitydialog) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogref.close();
  }
}
