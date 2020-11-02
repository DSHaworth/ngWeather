import { DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, switchMap } from 'rxjs/operators';
import { ForecastDetails } from '../models/forecast-details';
import { IForecastOffice } from '../models/forecast-office';
import { GridDetails } from '../models/grid-details';
import { HttpErrorHandlerService } from './http-error-handler.service';

declare const require;
const xml2js = require("xml2js");

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
            .get<GridDetails>(`https://api.weather.gov/points/${lat},${long}`)
            .pipe(catchError(this.httpErrorHandlerService.handleError));
  }

  public getByForecast(url: string){
    return this.httpClient
            .get<ForecastDetails>(url)
            .pipe(catchError(this.httpErrorHandlerService.handleError));
  }

  public getForecastOffice(url: string){
    return this.httpClient
            .get<IForecastOffice>(url)
            .pipe(catchError(this.httpErrorHandlerService.handleError));
  }

  public getAlerts(){
    // https://alerts.weather.gov/
    return this.httpClient
            .get("https://alerts.weather.gov/cap/us.php?x=0", { responseType: "text" })
            .pipe(catchError(this.httpErrorHandlerService.handleError))
            .pipe(
              switchMap(async xml => await this.parseXmlToJson(xml))
            );
      ;
  }

  async parseXmlToJson(xml) {
    // https://stackblitz.com/edit/angular-get-xml-with-http-client-and-render-list
    // console.log(xml)
    const parser = new xml2js.Parser({ explicitArray: false });
    parser
      .parseStringPromise(xml)
      .then(function(result) {
        console.log(result);
        console.log("Done");
      })
      .catch(function(err) {
        // Failed
      });

  }
}

// https://radar.weather.gov/Conus/Loop/NatLoop_Small.gif
// https://noaa.maps.arcgis.com/apps/TimeAware/index.html?appid=3eb23d7688154631858c128c6ae83be2

// https://stackoverflow.com/questions/36356334/parsing-national-weather-service-json-with-php

// https://forecast.weather.gov/MapClick.php?lat=36.321903791028205&lon=-96.80576767853478&FcstType=json
// http://forecast.weather.gov/MapClick.php?lon=-95.9345&lat=41.2565
// https://radar.weather.gov/Thumbs/OAX_Thumb.gif
// https://www.weather.gov/documentation/services-web-api
//   https://api.weather.gov/points/39.7456,-97.0892
//    Contains "properties: forecast" which has
//     https://api.weather.gov/gridpoints/TOP/31,80/forecast
