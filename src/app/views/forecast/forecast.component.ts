import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ForecastDetails } from 'src/app/models/forecast-details';
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private weatherGovService: WeatherGovService
  ) { }

  private getWeatherByPoints(lat: number, long: number){
    this.getByCoordsSubscription = this.weatherGovService.getByCoords(lat,long)
      .subscribe((data: GridDetails)=>{
        this.gridDetails = data;
        this.getWeatherByForecast(this.gridDetails.properties.forecast);
      })
  }

  private getWeatherByForecast(url){
    this.getByForecastSubscription = this.weatherGovService.getByForecast(url)
      .subscribe((data: ForecastDetails)=>{
        this.forecastDetails = data;
      })
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let lat = params['lat'];
      let long = params['long'];

      this.getWeatherByPoints(lat, long);
    });
  }

  ngOnDestroy(): void{
    this.getByCoordsSubscription.unsubscribe();
    this.getByForecastSubscription.unsubscribe();
  }

}
