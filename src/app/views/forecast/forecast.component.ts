import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { DialogForcastDetailComponent } from 'src/app/dialogs/dialog-forcast-detail/dialog-forcast-detail.component';
import { ForecastDetails, IPeriod } from 'src/app/models/forecast-details';
import { IForecastOffice } from 'src/app/models/forecast-office';
import { GridDetails } from 'src/app/models/grid-details';
import { WeatherGovService } from 'src/app/services/weather-gov.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit, OnDestroy {

  getByCoordsSubscription: Subscription;
  getByForecastSubscription: Subscription;

  gridDetails: GridDetails;
  forecastDetails: ForecastDetails;
  forecastOffice: IForecastOffice;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private weatherGovService: WeatherGovService
  ) { }

  public onPeriodSelected(event){
    console.log(event.option.value)

    let selectedPeriod = event.option.value;

    this.showDetail(selectedPeriod);

    //const dialogRef = this.dialog.open(DialogForcastDetailComponent, {data: selectedPeriod, width: "50vw"});

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });

  }

  public showDetail(period){
    //const dialogRef = this.dialog.open(DialogForcastDetailComponent, {data: period, width: window.innerWidth < 768 ? "80vw" : "50vw"});
    // https://stackoverflow.com/questions/45928423/get-rid-of-white-space-around-angular-material-modal-dialog
    const dialogRef = this.dialog.open(DialogForcastDetailComponent, {panelClass: 'weather-detail-dialog', data: period});
  }

  public refresh(){
    this.activatedRoute.queryParams.subscribe(params => {
      let lat = params['lat'];
      let long = params['long'];

      this.getWeatherByPoints(lat, long);
    });
  }

  private getWeatherByPoints(lat: number, long: number){
    this.getByCoordsSubscription = this.weatherGovService.getByCoords(lat,long)
      .subscribe((data: GridDetails)=>{
        this.gridDetails = data;

        //this.getWeatherByForecast(this.gridDetails.properties.forecast);
        // https://ultimatecourses.com/blog/rxjs-forkjoin-combine-observables
        forkJoin([
          this.weatherGovService.getForecastOffice(this.gridDetails.properties.forecastOffice),
          this.weatherGovService.getByForecast(this.gridDetails.properties.forecast)
        ]).subscribe(result => {
          this.forecastOffice = result[0];

          this.forecastDetails = result[1];

          console.log("Result[0]");
          console.log(result[0]);

          console.log("Result[1]");
          console.log(result[1]);

        });


      });
  }


  // private getWeatherByForecast(url){
  //   this.getByForecastSubscription = this.weatherGovService.getByForecast(url)
  //     .subscribe((data: ForecastDetails)=>{
  //       this.forecastDetails = data;
  //     });
  // }

  ngOnInit(): void {
    this.refresh();
  }

  ngOnDestroy(): void{
    this.getByCoordsSubscription.unsubscribe();
    this.getByForecastSubscription.unsubscribe();
  }

}
