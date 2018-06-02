import { Injectable } from '@angular/core';

//@Injectable()
@Injectable({
  providedIn: 'root'
})
export class RouteService {
  public locationArr = {};
  constructor() { }

  public setSearchParams(loc){
    this.locationArr = loc;
  }

  public setRouteDetails(routeArr){
      console.log("inside set router details");
  }

//Fetch route detials from API using http call
  getRouteDetails(orig, dest){
  	
  	return [
   {
      "routekey":101,
      "containerType":"20FT",
      "duration":50,
      "price":1120,
      "journeyLegs":[
         {
            "sequence":1,
            "origin":"INDEL",
            "destination":"INBOM",
            "mode":"inland",
            "startDate":"01-JUN-2018",
            "endDate":"02-JUN-2018",
            "cutoffDate":"",
            "duration":5,
            "price":180,
            "vessel":"",
            "voyage":""
         },
         {
            "sequence":2,
            "origin":"INBOM",
            "destination":"NLRTM",
            "mode":"ocean",
            "startDate":"11-JUN-2018",
            "endDate":"30-JUN-2018",
            "cutoffDate":"09-JUN-2018",
            "duration":20,
            "price":680,
            "vessel":"CMA CGM LA TRAVIATA",
            "voyage":"LT101"
         },
         {
            "sequence":3,
            "origin":"NLRTM",
            "destination":"FRMRS",
            "mode":"inland",
            "startDate":"01-JUL-2018",
            "endDate":"15-JUL-2018",
            "cutoffDate":"",
            "duration":6,
            "price":260,
            "vessel":"",
            "voyage":""
         }
      ]
   },
   {
      "routekey":102,
      "containerType":"20FT",
      "duration":50,
      "price":1120,
      "journeyLegs":[
         {
            "sequence":1,
            "origin":"INDEL",
            "destination":"INMAA",
            "mode":"inland",
            "startDate":"01-JUN-2018",
            "endDate":"05-JUN-2018",
            "cutoffDate":"",
            "duration":5,
            "price":180,
            "vessel":"",
            "voyage":""
         },
         {
            "sequence":2,
            "origin":"INMAA",
            "destination":"BEANR",
            "mode":"ocean",
            "startDate":"11-JUN-2018",
            "endDate":"30-JUN-2018",
            "cutoffDate":"09-JUN-2018",
            "duration":20,
            "price":680,
            "vessel":"CMA CGM LA TRAVIATA",
            "voyage":"LT101"
         },
         {
            "sequence":3,
            "origin":"BEANR",
            "destination":"FRMRS",
            "mode":"inland",
            "startDate":"01-JUL-2018",
            "endDate":"06-JUL-2018",
            "cutoffDate":"",
            "duration":6,
            "price":260,
            "vessel":"",
            "voyage":""
         }
      ]
   }
]
  }
}
