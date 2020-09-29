import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArcGisLocationDetails } from 'src/app/models/arcgis-location-details';
import { ArcGisSuggestion } from 'src/app/models/arcgis-suggestion';
import { ArcgisService } from 'src/app/services/arcgis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {

  findSubscription: Subscription;

  constructor(
    private router: Router,
    private arcgisService: ArcgisService,
  ) {
  }

  public getWeatherByLocation(target: ArcGisSuggestion){
    this.findSubscription = this.arcgisService.find(target.text, target.magicKey)
      .subscribe((data: ArcGisLocationDetails)=>{
        let lat = data.locations[0].feature.geometry.y;
        let long = data.locations[0].feature.geometry.x;
        this.router.navigate(['/forecast'], { queryParams: { lat: lat, long: long } });
      })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void{
    this.findSubscription.unsubscribe();
  }
}
