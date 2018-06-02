import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  getLocationList() {return [
  {
   "locationCode": "BEANR",
   "countryName": "Belgium-Antwerp",
   "locationType": "INLAND",
   "latitude": "129.0",
   "longitude": "123.0"
	}
	];
}
}