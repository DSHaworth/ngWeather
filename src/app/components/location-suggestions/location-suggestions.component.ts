import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { ArcGisSuggestion } from 'src/app/models/arcgis-suggestion';
import { ArcgisService } from 'src/app/services/arcgis.service';

@Component({
  selector: 'app-location-suggestions',
  templateUrl: './location-suggestions.component.html',
  styleUrls: ['./location-suggestions.component.scss']
})
export class LocationSuggestionsComponent implements OnInit, OnDestroy {

  readonly emptySuggestion: ArcGisSuggestion = {
    isCollection: false,
    text: "",
    magicKey: ""
  }

  public errorMsg: string;
  searchSubscription: Subscription;
  searchFormGroup: FormGroup;
  suggestions: ArcGisSuggestion[];
  isLoading = false;
  target: ArcGisSuggestion = this.emptySuggestion;

  constructor(
    private searchFormBuilder: FormBuilder,
    private arcgisService: ArcgisService
  ) {
    this.initSearchFormGroup();
   }

  public updateMySelection(selectedItem: ArcGisSuggestion){
    this.target = selectedItem;
  }

  public displayProperty(value:ArcGisSuggestion): string | ArcGisSuggestion {
    return value ? value.text : value;
  }

  private initSearchFormGroup(){
    this.searchFormGroup = this.createSearchFormGroup();
  }

  private createSearchFormGroup(){
    return this.searchFormBuilder.group({
      search: ['', Validators.required]
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

  ngOnInit(): void {
    this.initSuggestions();
  }

  ngOnDestroy(): void{
    this.searchSubscription.unsubscribe();
  }

}
