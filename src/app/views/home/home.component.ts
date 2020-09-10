import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { getMatInputUnsupportedTypeError } from '@angular/material/input';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  readonly usMapSource = "//forecast.weather.gov/wwamap/png/US.png";
  readonly alaskaMapSource = "//forecast.weather.gov/wwamap/png/ak.png";
  readonly hawaiiMapSource = "//weather.gov/wwamap/png/hi.png";

  searchFormGroup: FormGroup;
  usMap:string;
  alaskaMap: string;
  hawaiiMap: string;
  timeStamp: string;

  constructor(
    private searchFormBuilder: FormBuilder,
  ) {
    this.initSearchFormGroup();
  }

  get search() { return this.searchFormGroup.get('search').value; }

  getMaps():void{

    let now = new Date();
    let cacheBust = now.getTime();

    this.usMap = this.usMapSource + "?" + cacheBust;
    this.alaskaMap = this.alaskaMapSource + "?" + cacheBust;
    this.hawaiiMap = this.hawaiiMapSource + "?" + cacheBust;
    this.timeStamp = now.toUTCString();
  }

  initSearchFormGroup(){
    this.searchFormGroup = this.createSearchFormGroup();
  }

  createSearchFormGroup(){
    return this.searchFormBuilder.group({
      search: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getMaps();
  }

}
