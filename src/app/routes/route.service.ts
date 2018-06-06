import { Injectable } from '@angular/core';
//import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, URLSearchParams, RequestMethod, ResponseContentType} from '@angular/http';

import from 'rxjs/add/operator/map';
//import 'rxjs/add/operator/map';
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

  constructor(private http: Http ) { }

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
   
   let headers = new Headers();
   let qryParams = new URLSearchParams();
   qryParams.append('origin',orig);
   qryParams.append('destination',dest);
   qryParams.append('startDate', '2018-05-29');
   qryParams.append('containerType','20FT');   
    
   return this.http.post(this.reqUrl+'journey', qryParams , {headers: headers, params: qryParams});
   
   //return this.http.post('http://localhost/test/routeList.php', qryParams, {headers: headers, params: qryParams});
   
   }
}