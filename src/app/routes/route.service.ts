import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

interface routeArr {
   list : Object;
}
//@Injectable()
@Injectable({
  providedIn: 'root'
})
export class RouteService {
  public locationArr: {origin: '', destination: ''};
  
  private reqUrl = 'http://cmademostaginglb-1757996027.us-east-2.elb.amazonaws.com/';

  constructor(private http: HttpClient ) { }

  public setSearchParams(loc){
    this.locationArr = loc;
  }

  public getSearchParams(){
    return this.locationArr;
  }

  public setRouteDetails(routeArr){
      //console.log("inside set router details");
  }

//Fetch route detials from API using http call

  getRouteDetails(orig, dest){
      return this.http.get<routeArr>('https://my-json-server.typicode.com/suchismita1234/UIDemo1/db/');
     
     // return this.http.get<routeArr>(this.reqUrl+'journey/?origin=INDEL&destination=FRMRS&startDate=2018-05-29&containerType=20FT');
     // return this.http.get<routeArr>(this.reqUrl+'location/');
  }
  }