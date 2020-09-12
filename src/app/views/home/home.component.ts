import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatAutocompleteActivatedEvent } from '@angular/material/autocomplete';
import { Observable, of } from 'rxjs';

import { debounceTime, tap, switchMap, finalize, map } from 'rxjs/operators';
import { ArcGisSuggestion } from 'src/app/models/arcgis-suggestion';
import { ArcgisService } from 'src/app/services/arcgis.service';

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
    private arcgisService: ArcgisService
  ) {
    this.initSearchFormGroup();
  }

  public getWeather(){
    alert("Get weather for " + this.target.text);
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
          //https://stackblitz.com/edit/rxjs-deprecated-null-tap
          next: () => {
            this.errorMsg = "";
            this.suggestions = [];
          }
        }),
        switchMap((value) => this.getData(value).pipe(
          finalize(() => {
            this.isLoading = false;
          })
        ))

        // switchMap(() => this.arcgisService.getSuggestions(this.searchValue.text)
        //   .pipe(
        //     finalize(() => {
        //       this.isLoading = false;
        //     }),
        //   )
        // )
      )
      //.subscribe();
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
      //this.arcgisService.getSuggestions(value)
      console.log("Search");

      this.isLoading = true;
      return  <Observable<ArcGisSuggestion[]>> this.arcgisService.getSuggestions(value);
      // .subscribe({
      //   next: (data) => {
      //     if (data['suggestions'] && data['suggestions'].length === 0) {
      //       this.errorMsg = "No records returned";
      //       this.suggestions = [];
      //       this.target = this.emptySuggestion;
      //     } else {
      //       this.errorMsg = "";
      //       this.suggestions = data['suggestions'];
      //     }
      //   },     // nextHandler
      //   error: () => {  },    // errorHandler
      //   complete: () => {
      //     this.isLoading = true;
      //   }
      // });
    } else {
      console.log("Already found")
      return of([value]);
    }
    return null;
  }

  public updateMySelection(selectedItem: ArcGisSuggestion){
    this.target = selectedItem;
  }



  // private initSuggestions(){
  //   // https://www.freakyjolly.com/angular-material-autocomplete-example-using-server-results/#.X1rZwHlKiUk
  //   this.searchFormGroup.get('search').valueChanges
  //     .pipe(
  //       debounceTime(500),
  //       tap({
  //         //https://stackblitz.com/edit/rxjs-deprecated-null-tap
  //         next: () => {
  //           this.errorMsg = "";
  //           this.suggestions = [];
  //           this.isLoading = true;
  //         }
  //       }),
  //       switchMap((value) => this.arcgisService.getSuggestions(value)
  //         .pipe(
  //           finalize(() => {
  //             this.isLoading = false;
  //           }),
  //         )
  //       )
  //       // switchMap(() => this.arcgisService.getSuggestions(this.searchValue.text)
  //       //   .pipe(
  //       //     finalize(() => {
  //       //       this.isLoading = false;
  //       //     }),
  //       //   )
  //       // )
  //     )
  //     .subscribe(data => {
  //       if (data['suggestions'] && data['suggestions'].length === 0) {
  //         this.errorMsg = "No records returned";
  //         this.suggestions = [];
  //         this.target = this.emptySuggestion;
  //       } else {
  //         this.errorMsg = "";
  //         this.suggestions = data['suggestions'];
  //       }
  //     });
  // }

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
