import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-forcast-detail',
  templateUrl: './dialog-forcast-detail.component.html',
  styleUrls: ['./dialog-forcast-detail.component.scss']
})
export class DialogForcastDetailComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

}
