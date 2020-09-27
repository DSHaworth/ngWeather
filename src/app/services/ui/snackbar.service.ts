import { Injectable, Component, Inject, ViewEncapsulation } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar: MatSnackBar) { }

  defaultDisplayTime:number = 5;

  showError(message: string){
    this.snackbar.openFromComponent(SnackbarComponent, {
      data: {message: message, title: "Error", icon: "fa-exclamation-circle"},
      duration: this.defaultDisplayTime * 1000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: ["customize-snackbar", "snackbar-error"]
    });
  }

  showSuccess(message: string){
    this.snackbar.openFromComponent(SnackbarComponent, {
      data: {message: message, title: "Success", icon: "fa-check-circle"},
      duration: this.defaultDisplayTime * 1000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: ["customize-snackbar", "snackbar-success"]
    });
  }

  showInfo(message: string){
    this.snackbar.openFromComponent(SnackbarComponent, {
      data: {message: message, title: "Info", icon: "fa-info-circle"},
      duration: this.defaultDisplayTime * 1000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: ["customize-snackbar", "snackbar-info"]
    });
  }
}

import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
@Component({
  selector: 'snack-bar-component-example-snack',
  styles: [
`.mat-snack-bar-container .container {
  margin-top: -10px;
  font-weight: normal;
}`,
`.mat-snack-bar-container .container .header {
  display: flex;
  flex-flow: row nowrap;
}`,
`.mat-snack-bar-container .container .header .message-icon{
  height: 40px;
  width: 20px;
  padding-right: 5px;
  line-height: 40px;
}`,
`.mat-snack-bar-container .container .header .title {
  flex-grow: 1;
  line-height: 40px;
}`,
`.mat-snack-bar-container .container .message {

}`,
`.mat-snack-bar-container.customize-snackbar {
  padding: 14px 5px 14px 16px;
  font-size: 1.1rem;
  font-weight: normal;
}`,
`.mat-snack-bar-container.snackbar-error {
  background-color: #ff0000ff;
  color: #ffffffff;
}`,
`.mat-snack-bar-container.snackbar-success {
  background-color: #009900ff;
  color: #ffffffff;
}`,
`.mat-snack-bar-container.snackbar-info {
  background-color: #0000ffff;
  color: #ffffffff;
}`],
  template: `
<div class="container">
  <div class="header">
    <div class="message-icon">
      <i class="fas {{data.icon}}"></i>
    </div>
    <div class="title">{{data.title}}</div>
    <div>
      <button mat-icon-button (click)="snackBarRef.dismiss()">
        <mat-icon>close</mat-icon>
      </button>
    </div>
  </div>
  <div class="message">{{data.message}}</div>
</div>`,
encapsulation: ViewEncapsulation.None
})
export class SnackbarComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<SnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }
}
