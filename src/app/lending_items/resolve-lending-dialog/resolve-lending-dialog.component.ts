import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'resolve-lending-dialog',
  templateUrl: './resolve-lending-dialog.component.html',
  styleUrls: ['./resolve-lending-dialog.component.css']
})
export class ResolveLendingDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ResolveLendingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
