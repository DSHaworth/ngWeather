import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { debounceTime, tap, switchMap, finalize, map } from 'rxjs/operators';
import { ArcGisLocationDetails } from 'src/app/models/arcgis-location-details';
import { ForecastDetails } from 'src/app/models/forecast-details'
import { ArcGisSuggestion } from 'src/app/models/arcgis-suggestion';
import { GridDetails } from 'src/app/models/grid-details';
import { ArcgisService } from 'src/app/services/arcgis.service';
import { WeatherGovService } from 'src/app/services/weather-gov.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  readonly usMapSource: string = "//forecast.weather.gov/wwamap/png/US.png";
  readonly alaskaMapSource: string = "//forecast.weather.gov/wwamap/png/ak.png";
  readonly hawaiiMapSource: string = "//weather.gov/wwamap/png/hi.png";
  readonly emptySuggestion: ArcGisSuggestion = {
    isCollection: false,
    text: "",
    magicKey: ""
  }

  searchFormGroup: FormGroup;
  usMap:string;
  alaskaMap: string;
  hawaiiMap: string;
  timeStamp: string;

  suggestions: ArcGisSuggestion[];
  isLoading = false;
  errorMsg: string;
  target: ArcGisSuggestion = this.emptySuggestion;

  constructor(
    private searchFormBuilder: FormBuilder,
    private arcgisService: ArcgisService,
    private weatherGovService: WeatherGovService
  ) {
    this.initSearchFormGroup();
  }

  public getWeatherByLocation(){
    this.arcgisService.find(this.target.text, this.target.magicKey).subscribe((data: ArcGisLocationDetails)=>{
      let lat = data.locations[0].feature.geometry.y;
      let long = data.locations[0].feature.geometry.x;

      this.getWeatherByPoints(lat, long);
    })

  }

  public getWeatherByPoints(lat: number, long: number){
    console.log(`GetWeatherByPoints(${lat}, ${long}`);

    this.weatherGovService.getByCoords(lat,long).subscribe((data: GridDetails)=>{
      this.getWeatherByForecast(data.properties.forecast);
    })
  }

  private getWeatherByForecast(url){
    this.weatherGovService.getByForecast(url).subscribe((data: ForecastDetails)=>{
      console.log(data);
    })
  }

  public updateMySelection(selectedItem: ArcGisSuggestion){
    this.target = selectedItem;
  }

  public displayProperty(value:ArcGisSuggestion): string | ArcGisSuggestion {
    return value ? value.text : value;
  }

  public getMaps():void{

    let now = new Date();
    let cacheBust = now.getTime();

    this.usMap = this.usMapSource + "?" + cacheBust;
    this.alaskaMap = this.alaskaMapSource + "?" + cacheBust;
    this.hawaiiMap = this.hawaiiMapSource + "?" + cacheBust;
    this.timeStamp = now.toUTCString();
  }

  private initSuggestions(){
    // https://www.freakyjolly.com/angular-material-autocomplete-example-using-server-results/#.X1rZwHlKiUk
    this.searchFormGroup.get('search').valueChanges
      .pipe(
        debounceTime(500),
        tap({
          next: () => {
            this.errorMsg = "";
            this.suggestions = [];
          }
        }),
        switchMap((value) => this.getData(value))
      )
      .subscribe(data => {
        if (data['suggestions'] && data['suggestions'].length === 0) {
          this.errorMsg = "No records returned";
          this.suggestions = [];
          this.target = this.emptySuggestion;
        } else {
          this.errorMsg = "";
          this.suggestions = data['suggestions'];
        }
      });
  }

  private getData(value: string | ArcGisSuggestion): Observable<ArcGisSuggestion[]>{
    if( typeof value === 'string'){
      this.isLoading = true;
      return  <Observable<ArcGisSuggestion[]>> this.arcgisService.getSuggestions(value).pipe(
        finalize(() => {
          this.isLoading = false;
        })
      );
    } else {
      return of([value]);
    }
  }

  private initSearchFormGroup(){
    this.searchFormGroup = this.createSearchFormGroup();
  }

  private createSearchFormGroup(){
    return this.searchFormBuilder.group({
      search: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getMaps();

    this.initSuggestions();
  }
}
