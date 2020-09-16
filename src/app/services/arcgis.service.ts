import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { HttpErrorHandlerService } from './http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ArcgisService {

  constructor(
    private httpClient: HttpClient,
    private httpErrorHandlerService: HttpErrorHandlerService
  ) { }

  getSuggestions( value: string){
    return this.httpClient
            .get(`http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?text=${value}&f=json&maxSuggestions=10&countryCode=USA,PRI,VIR,GUM,ASM&category=Land%20Features,Bay,Channel,Cove,Dam,Delta,Gulf,Lagoon,Lake,Ocean,Reef,Reservoir,Sea,Sound,Strait,Waterfall,Wharf,Amusement%20Park,Historical%20Monument,Landmark,Tourist%20Attraction,Zoo,College,Beach,Campground,Golf%20Course,Harbor,Nature%20Reserve,Other%20Parks%20and%20Outdoors,Park,Racetrack,Scenic%20Overlook,Ski%20Resort,Sports%20Center,Sports%20Field,Wildlife%20Reserve,Airport,Ferry,Marina,Pier,Port,Resort,Postal,Populated%20Place`)
            .pipe(catchError(this.httpErrorHandlerService.handleError));
  }

  find( text: string, magicKey: string){
    return this.httpClient
            .get(`http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/find?text=${text}&magicKey=${magicKey}&f=json`)
            .pipe(catchError(this.httpErrorHandlerService.handleError));
  }
}

//http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?text=68135&f=json&maxSuggestions=10
//http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?text=68135&f=json&maxSuggestions=10&countryCode=USA,PRI,VIR,GUM,ASM
//http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?text=68135&f=json&maxSuggestions=10&countryCode=USA,PRI,VIR,GUM,ASM&category=Land%20Features,Bay,Channel,Cove,Dam,Delta,Gulf,Lagoon,Lake,Ocean,Reef,Reservoir,Sea,Sound,Strait,Waterfall,Wharf,Amusement%20Park,Historical%20Monument,Landmark,Tourist%20Attraction,Zoo,College,Beach,Campground,Golf%20Course,Harbor,Nature%20Reserve,Other%20Parks%20and%20Outdoors,Park,Racetrack,Scenic%20Overlook,Ski%20Resort,Sports%20Center,Sports%20Field,Wildlife%20Reserve,Airport,Ferry,Marina,Pier,Port,Resort,Postal,Populated%20Place

//http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?f=json&countryCode=USA%2CPRI%2CVIR%2CGUM%2CASM&category=Land+Features%2CBay%2CChannel%2CCove%2CDam%2CDelta%2CGulf%2CLagoon%2CLake%2COcean%2CReef%2CReservoir%2CSea%2CSound%2CStrait%2CWaterfall%2CWharf%2CAmusement+Park%2CHistorical+Monument%2CLandmark%2CTourist+Attraction%2CZoo%2CCollege%2CBeach%2CCampground%2CGolf+Course%2CHarbor%2CNature+Reserve%2COther+Parks+and+Outdoors%2CPark%2CRacetrack%2CScenic+Overlook%2CSki+Resort%2CSports+Center%2CSports+Field%2CWildlife+Reserve%2CAirport%2CFerry%2CMarina%2CPier%2CPort%2CResort%2CPostal%2CPopulated+Place&maxSuggestions=10&text=68135


//Land Features,Bay,Channel,Cove,Dam,Delta,Gulf,Lagoon,Lake,Ocean,Reef,Reservoir,Sea,Sound,Strait,Waterfall,Wharf,Amusement Park,Historical Monument,Landmark,Tourist Attraction,Zoo,College,Beach,Campground,Golf Course,Harbor,Nature Reserve,Other Parks and Outdoors,Park,Racetrack,Scenic Overlook,Ski Resort,Sports Center,Sports Field,Wildlife Reserve,Airport,Ferry,Marina,Pier,Port,Resort,Postal,Populated Place


// var categories = [
//   'Land Features',
//   'Bay','Channel','Cove','Dam','Delta','Gulf','Lagoon','Lake','Ocean','Reef','Reservoir','Sea','Sound','Strait','Waterfall','Wharf', // Water Features
//   'Amusement Park', 'Historical Monument', 'Landmark', 'Tourist Attraction', 'Zoo', // POI/Arts and Entertainment
//   'College', // POI/Education
//   'Beach', 'Campground', 'Golf Course', 'Harbor', 'Nature Reserve', 'Other Parks and Outdoors', 'Park', 'Racetrack',
//     'Scenic Overlook', 'Ski Resort', 'Sports Center', 'Sports Field', 'Wildlife Reserve', // POI/Parks and Outdoors
//   'Airport', 'Ferry', 'Marina', 'Pier', 'Port', 'Resort', // POI/Travel
//   'Postal', 'Populated Place'
// ]
// cats = categories.join(','),
