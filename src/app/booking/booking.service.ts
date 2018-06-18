import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  public bookingRef = 123456788;
  public bookingDetailsArr: any;
  public bookingCreatArr: any;
  private reqUrl = "http://cmademostaginglb-1757996027.us-east-2.elb.amazonaws.com/";
  
  constructor(private http: Http, private route: ActivatedRoute) { }
 
  createBooking(formData){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept','application/json');
    let reqParams : string;
    reqParams = JSON.stringify(formData);
    return this.http.post(this.reqUrl+'booking/', reqParams , {headers: headers});
  }
 
 
  getBookingDetails(bookingRef){
    let href= location.href;
    bookingRef= href.match(/([^\/]*)\/*$/)[1];
    console.log(bookingRef);
    let headers = new Headers();
    return this.http.get(this.reqUrl+'booking/findByReference/'+bookingRef , {headers: headers});
  }
  
  
  setBookingRef(bookingRef){
    let headers = new Headers();
    return this.http.get(this.reqUrl+'booking/findByReference/'+bookingRef, {headers: headers}).
        subscribe(data => {
            debugger;
            console.log(data.json());   
            this.bookingDetailsArr = data.json();
        }); 
        
    }

    
}
