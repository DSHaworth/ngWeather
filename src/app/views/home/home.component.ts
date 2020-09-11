import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { getMatInputUnsupportedTypeError } from '@angular/material/input';
import { ArcGisSuggestions } from 'src/app/models/arcgis-suggestions';

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

  suggestions: ArcGisSuggestions[];
  isLoading = false;
  errorMsg: string;

  constructor(
    private searchFormBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.initSearchFormGroup();
  }

  get searchValue() { return this.searchFormGroup.get('search').value; }

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

    // https://www.freakyjolly.com/angular-material-autocomplete-example-using-server-results/#.X1rZwHlKiUk
    this.searchFormGroup.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = "";
          this.suggestions = [];
          this.isLoading = true;
        }),
        switchMap(value => this.http.get(`http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?text=${this.searchValue}&f=json&maxSuggestions=10&countryCode=USA,PRI,VIR,GUM,ASM&category=Land%20Features,Bay,Channel,Cove,Dam,Delta,Gulf,Lagoon,Lake,Ocean,Reef,Reservoir,Sea,Sound,Strait,Waterfall,Wharf,Amusement%20Park,Historical%20Monument,Landmark,Tourist%20Attraction,Zoo,College,Beach,Campground,Golf%20Course,Harbor,Nature%20Reserve,Other%20Parks%20and%20Outdoors,Park,Racetrack,Scenic%20Overlook,Ski%20Resort,Sports%20Center,Sports%20Field,Wildlife%20Reserve,Airport,Ferry,Marina,Pier,Port,Resort,Postal,Populated%20Place`)
          .pipe(
            finalize(() => {
              this.isLoading = false;
            }),
          )
        )
      )
      .subscribe(data => {

        console.log(data)

        if (data['suggestions'] && data['suggestions'].length === 0) {
          this.errorMsg = "No records returned";
          this.suggestions = [];
        } else {
          this.errorMsg = "";
          this.suggestions = data['suggestions'];
          console.log(data);
        }

      });

  }

}
