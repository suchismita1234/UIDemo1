import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public originList: {};
  public destinationList: {};

  constructor() { }

  getLocationList() {
   
   let headers = new Headers();
    
   //return this.http.post(this.reqUrl+'journey', {headers: headers});
   return this.http.post('http://localhost/test/routeList.php', qryParams, {headers: headers, params: qryParams});
   
  }
}