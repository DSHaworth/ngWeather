import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-forcast-detail',
  templateUrl: './dialog-forcast-detail.component.html',
  styleUrls: ['./dialog-forcast-detail.component.scss']
})
export class DialogForcastDetailComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  public getWindDirection(windDirection: string): string{
    switch(windDirection.toUpperCase()){
      case "N":
        return "from the North";
      case "E":
        return "from the East";
      case "W":
        return "from the West";
      case "S":
        return "from the South";
      case "SE":
        return "from the South East";
      case "SW":
        return "from the South West";
      case "NE":
        return "from the North East";
      case "NW":
        return "from the North West";
      case "NNW":
        return "from the North northwest";
      case "NNE":
        return "from the North northeast";
      case "SSW":
        return "from the South southwest";
      case "SSE":
        return "from the South southeast";
      case "ESE":
        return "East southeast";
      case "ENE":
        return "East northeast";
      case "WSW":
        return "West southwest";
      case "WNW":
        return "West northwest";
      default:
        return windDirection;
    }
  }

  ngOnInit(): void {
  }

}
