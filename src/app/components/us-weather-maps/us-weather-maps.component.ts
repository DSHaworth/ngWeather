import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/services/ui/snackbar.service';

@Component({
  selector: 'app-us-weather-maps',
  templateUrl: './us-weather-maps.component.html',
  styleUrls: ['./us-weather-maps.component.scss']
})
export class UsWeatherMapsComponent implements OnInit, OnDestroy {

  @ViewChild('usMap', { static: false }) public usMap: ElementRef;
  @ViewChild('alMap', { static: false }) public alMap: ElementRef;
  @ViewChild('hiMap', { static: false }) public hiMap: ElementRef;

  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;

  readonly usMapSource: string = "//forecast.weather.gov/wwamap/png/US.png";
  readonly alaskaMapSource: string = "//forecast.weather.gov/wwamap/png/ak.png";
  readonly hawaiiMapSource: string = "//weather.gov/wwamap/png/hi.png";

  public allMapsLoaded: boolean = false;
  public timeStamp: string;

  usMapUrl:string;
  alaskaMapUrl: string;
  hawaiiMapUrl: string;

  usMapLoaded: boolean = false;
  alMapLoaded: boolean = false;
  hiMapLoaded: boolean = false;


  constructor(
    private snackbarService: SnackbarService,
  ) { }

  public getMaps():void{

    let now = new Date();
    let cacheBust = now.getTime();

    this.usMapUrl = this.usMapSource + "?" + cacheBust;
    this.alaskaMapUrl = this.alaskaMapSource + "?" + cacheBust;
    this.hawaiiMapUrl = this.hawaiiMapSource + "?" + cacheBust;
    this.timeStamp = now.toUTCString();
  }

  public clickMap(){
    this.snackbarService.showInfo("Clicking on map doesn't do anything.");
  }

  public mapLoaded(mapName: string){
    switch(mapName.toUpperCase()){
      case "US":
        this.usMapLoaded = true;
        break;

      case "AL":
        this.alMapLoaded = true;
        break;

      case "HI":
        this.hiMapLoaded = true;
        break;
    }
    if(this.usMapLoaded && this.alMapLoaded && this.hiMapLoaded){
      this.allMapsLoaded = true;
      this.resizeImages();
    }
  }

  private resizeImages(){
    let usHeight = this.usMap.nativeElement.height;

    this.hiMap.nativeElement.style.height = this.alMap.nativeElement.style.height = (115 / 500) * usHeight + "px";
    this.hiMap.nativeElement.style.left = this.alMap.nativeElement.width + 4 + "px";
  }

  private resize(){
    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
      this.resizeImages();
    })
  }

  ngOnInit(): void {
    this.getMaps();
    this.resize();
  }

  ngOnDestroy(): void{
    this.resizeSubscription$.unsubscribe()
  }

}
