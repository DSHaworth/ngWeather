import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';

import { debounceTime, tap, switchMap, finalize, map } from 'rxjs/operators';
import { ArcGisLocationDetails } from 'src/app/models/arcgis-location-details';
import { ArcGisSuggestion } from 'src/app/models/arcgis-suggestion';
import { ArcgisService } from 'src/app/services/arcgis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

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

  // Subscriptions
  findSubscription: Subscription;
  searchSubscription: Subscription;

  constructor(
    private router: Router,
    private searchFormBuilder: FormBuilder,
    private arcgisService: ArcgisService,
  ) {
    this.initSearchFormGroup();
  }

  public getWeatherByLocation(){
    this.findSubscription = this.arcgisService.find(this.target.text, this.target.magicKey)
      .subscribe((data: ArcGisLocationDetails)=>{
        let lat = data.locations[0].feature.geometry.y;
        let long = data.locations[0].feature.geometry.x;
        this.router.navigate(['/forecast'], { queryParams: { lat: lat, long: long } });
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
    this.searchSubscription = this.searchFormGroup.get('search').valueChanges
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

  // Determine if source is string (do a search) or an object (do nothing)
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

  ngOnDestroy(): void{
    this.findSubscription.unsubscribe();
    this.searchSubscription.unsubscribe();
  }
}
