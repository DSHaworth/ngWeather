import { DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandlerService } from './http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherGovService {

  constructor(
    private httpClient: HttpClient,
    private httpErrorHandlerService: HttpErrorHandlerService
  ) { }

  public getByCoords(lat: number, long: number){
    return this.httpClient
            .get(`https://api.weather.gov/points/${lat},${long}`)
            .pipe(catchError(this.httpErrorHandlerService.handleError));
  }

  public getByForecast(url: string){
    return this.httpClient
            .get(url)
            .pipe(catchError(this.httpErrorHandlerService.handleError));
  }

}

// https://stackoverflow.com/questions/36356334/parsing-national-weather-service-json-with-php

// https://forecast.weather.gov/MapClick.php?lat=36.321903791028205&lon=-96.80576767853478&FcstType=json
// http://forecast.weather.gov/MapClick.php?lon=-95.9345&lat=41.2565
// https://radar.weather.gov/Thumbs/OAX_Thumb.gif
// https://www.weather.gov/documentation/services-web-api
//   https://api.weather.gov/points/39.7456,-97.0892
//    Contains "properties: forecast" which has
//     https://api.weather.gov/gridpoints/TOP/31,80/forecast
