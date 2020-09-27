import { Injectable, Component, Inject, ViewEncapsulation } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatIconModule, MatIcon} from '@angular/material/icon';

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
`.mat-snack-bar-container .flex {
  display: flex;
  justify-content: space-between;
}`,
`.mat-snack-bar-container .v-center{
  align-items: center;
  align-content: center;
}`,
`.mat-snack-bar-container .message-icon{
  height: 40px;
  width: 40px;
  line-height: 40px;
}`,
`.mat-snack-bar-container.customize-snackbar {
  padding: 14px 5px 14px 16px;
  font-size: 1.1rem;
  font-weight: 700;
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
<div style="margin-top: -10px; font-weight: normal;">
  <div style="display: flex; flex-flow: row nowrap;">
    <div class="message-icon">
        <i class="fas {{data.icon}}"></i>
    </div>
    <div style="flex-grow: 1; line-height: 40px;">{{data.title}}</div>
    <div class="dismiss" style="">
      <button mat-icon-button (click)="snackBarRef.dismiss()">
        <mat-icon>close</mat-icon>
      </button>
    </div>
  </div>
  <div class="data">{{data.message}}</div>
</div>`,
encapsulation: ViewEncapsulation.None
})
export class SnackbarComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<SnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }
}
