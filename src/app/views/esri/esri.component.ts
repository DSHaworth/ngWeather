import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { loadModules } from "esri-loader";
import { WeatherGovService } from 'src/app/services/weather-gov.service';

@Component({
  selector: 'app-esri',
  templateUrl: './esri.component.html',
  styleUrls: ['./esri.component.scss']
})
export class EsriComponent implements OnInit, OnDestroy {
  // The <div> where we will place the map
  @ViewChild("mapView", { static: true }) private mapViewEl: ElementRef;
  view: any;

  constructor(
    private weatherGovService: WeatherGovService
  ) {}

  async initializeMap() {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      const [Map, MapView] = await loadModules(["esri/Map", "esri/views/MapView"]);

      // Configure the Map
      const mapProperties = {
        basemap: "streets-vector"
      };

      const map = new Map(mapProperties);

      // Initialize the MapView
      const mapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: [0.1278, 51.5074],
        zoom: 10,
        map: map
      };

      this.view = new MapView(mapViewProperties);
      await this.view.when(); // wait for map to load

      this.addMapElements();

      return this.view;
    } catch (error) {
      console.error("EsriLoader: ", error);
    }
  }

  addMapElements(){
    //*** Comonent ***//
    let coordsWidget = document.createElement("div");
    coordsWidget.id = "coordsWidget";
    coordsWidget.className = "esri-widget esri-component";
    coordsWidget.style.padding = "7px 15px 5px";
    this.view.ui.add(coordsWidget, "bottom-right");

    //*** Functionality ***//
    let _this = this;

    function showCoordinates(view, pt) {
      var coords =
        "Lat/Lon " + pt.latitude.toFixed(3) + " " + pt.longitude.toFixed(3) +
        " | Scale 1:" + Math.round(view.scale * 1) / 1 +
        " | Zoom " + view.zoom;
      coordsWidget.innerHTML = coords;
    }

    _this.view.watch("stationary", function (isStationary) {
      showCoordinates(_this.view, _this.view.center);
    });

    _this.view.on("pointer-move", function (evt) {
      showCoordinates(_this.view, _this.view.toMap({ x: evt.x, y: evt.y }));
    });

    _this.view.on("click", function(evt){
      let coords = _this.view.toMap({ x: evt.x, y: evt.y });
      console.log(coords.latitude + ", " + coords.longitude);
    });
  }

  getAlerts(){
    this.weatherGovService.getAlerts()
    .subscribe( (data) => {
      console.log(data);
    });
  }

  ngOnInit() {
    this.initializeMap();
    this.getAlerts();
  }

  ngOnDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.destroy();
    }
  }
}

// https://developers.arcgis.com/javascript/latest/guide/angular/
// npm install --save esri-loader
