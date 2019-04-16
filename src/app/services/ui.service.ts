import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar,MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  loadingStateChanged = new Subject<boolean>();

  constructor(private snackbar: MatSnackBar) {


  }

  sucConfig:MatSnackBarConfig={
    duration:3000,
    horizontalPosition:'right',
    verticalPosition:'top'
  }

  showSnackbar(message, action, duration) {
    this.snackbar.open(message, action, {
      duration: duration
    })
  }

  success(msg){
    this.sucConfig['panelClass']=['notification','success']
    this.snackbar.open(msg,"",this.sucConfig)
  }
}
