import { Injectable } from '@angular/core';
//import { HttpClient, HttpHeaders  } from '@angular/common/http';
//import { Http, Response, Headers, RequestOptions, URLSearchParams, RequestMethod, ResponseContentType} from '@angular/http';
import { Http, Headers } from '@angular/http';

import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  public locationArr: any;
  public startDate: Date;
  //public journeyArr: any;
  public jArr1: any; public jArr2: any;
  private reqUrl = "http://cmademostaginglb-1757996027.us-east-2.elb.amazonaws.com/";

  public journeyArr = new BehaviorSubject({});
  currentJrnyLeg = this.journeyArr.asObservable();

  public routekey = new BehaviorSubject<number>(1);
  currentRoutekey = this.routekey.asObservable();

  public journeyLeg = new BehaviorSubject([]);
  currentJourneyLeg = this.journeyLeg.asObservable();

  constructor(private http: Http) { }

  public getJourneyLegs(requestParams) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let reqParams: string;
    reqParams = JSON.stringify(requestParams);
    return this.http.post(this.reqUrl + 'journey/update/', reqParams, { headers: headers }).
      subscribe(data => {
        this.jArr1 = this.journeyArr.getValue();
        this.jArr2 = data.json().journeyLegs;
        this.jArr1[0].price = this.jArr2[0].price;
        this.jArr1[1].price = this.jArr2[1].price;
        this.jArr1[2].price = this.jArr2[2].price;
        this.journeyLeg.next(this.jArr1);
      });
  }

  public getTotalPrice(requestParams) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let reqParams: string;
    reqParams = JSON.stringify(requestParams);
    return this.http.post(this.reqUrl + 'journey/update/', reqParams, { headers: headers });
  }

  setRoutekey(routekey: number) {
    this.routekey.next(routekey);
  }

  public setSearchParams(loc, startDate: Date) {
    this.locationArr = loc;
    this.startDate = startDate;
  }

  public getSearchParams() {
    return this.locationArr;
  }

  public setjourneyLegs(journeyLegsArr) {
    this.journeyArr.next(journeyLegsArr);
    console.log("set jrny");
    console.log(this.journeyArr);
  }

  /*Fetch route detials*/
  getRouteDetails(orig, dest) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let reqParams: string;
    let qryParams = { "origin": orig, "destination": dest, "startDate": this.startDate, "containerType": 'D20' };
    reqParams = JSON.stringify(qryParams);
    return this.http.post(this.reqUrl + 'journey/', reqParams, { headers: headers });
    /*.
    subscribe(data => {
            this.journeyLeg.next(data.json().journeyLegs);
       }); */
  }
}