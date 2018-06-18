import { Component, OnInit } from '@angular/core';
import { RouteService } from '../routes/route.service';
import { BookingService } from './booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking3.component.html',
  styleUrls: ['./booking3.component.css']
})
export class BookingComponent implements OnInit {

  routekey: number;
  journeyArr: {};
  journeyLeg: {};
  reefer: string = 'No';
  

  constructor(private router: Router, private Booking: BookingService, private Route: RouteService) { }

  public fieldArray: Array<any> = [{
    containerType: null,
    containerCount: null,
    description: null,
    hsCode: null,
    grossWeight: null,
    grossVolume: null,
    packageCount: null,
    deleteFlag: null
  }];
  private newAttribute: any = {};
  private test: Array<any> = [];
  public test1: Array<any> = [];
  public jrnyArrParams: Array<any> = [];
  public bkgRef: number = Math.floor(Math.random() * 90000) + 10000;
  public journeyLegs = {};
  public jArr: any;
  public reqParams: {};
  public slideIndex = 1;

  public comodity: string = 'Clothes';
  public chargeType: string = 'Prepaid';
  public containerType: string = '20DR';
  public total: any;

  ngOnInit() {
    this.Route.currentJrnyLeg.subscribe(journeyArr => this.journeyArr = JSON.stringify(journeyArr));
    this.Route.currentRoutekey.subscribe(routekey => this.routekey = routekey);
    this.Route.currentJourneyLeg.subscribe(journeyLeg => this.journeyLeg = journeyLeg);
    this.total = this.Route.getRouteDetails('FRMRS', 'USMNH').
      subscribe(data => {
        console.log(data.json());
        let allRouteDetails = data.json();
        this.total = allRouteDetails[0].journeyLegs[0]['price'] + allRouteDetails[0].journeyLegs[1]['price'] + allRouteDetails[0].journeyLegs[2]['price'];
        console.log(this.total);
      })
    this.showSlides(this.slideIndex);
  }

  changeJourneyArr() {

  }

  addNewCargoLine() {
    this.fieldArray.push(this.newAttribute);
    this.newAttribute = {
    };
  };

  deleteThisCargoLine(index) {
    this.fieldArray.splice(index, 1);
  }

  updateJourney(item, formType) {
    let cargoList = [];

    if (formType === 'bookingForm3') {
      let cList = {
        containerType: item,
        containerCount: 1
      };
      cargoList.push(cList);
    } else {
      for (let i = 0; i < this.fieldArray.length; i++) {
        let cList = {
          containerType: this.fieldArray[i].containerType,
          containerCount: this.fieldArray[i].containerCount
        };
        cargoList.push(cList);
      }
    }

    let reqParams = {
      "routekey": this.routekey,
      "cargoList": cargoList
    };
    this.Route.getJourneyLegs(reqParams);

    if (formType === 'bookingForm3') {
      this.total = this.Route.getTotalPrice(reqParams).
      subscribe(data => {
        console.log(data.json());
        let jArr2 = data.json().journeyLegs;
        this.total = jArr2[0].price + jArr2[1].price + jArr2[2].price;
        console.log(this.total);
      })
    }
  }


  shipper = { type: "SHIPPER", name: null, addressLine1: null, addressLine2: null, city: null, country: null, postalCode: null, email: null, phone: null };
  consignee = { type: "CONSIGNEE", name: null, addressLine1: null, addressLine2: null, city: null, country: null, postalCode: null, email: null, phone: null };
  forwarder = { type: "CONSIGNEE", name: null, addressLine1: null, addressLine2: null, city: null, country: null, postalCode: null, email: null, phone: null };

  apiList = {
    "bookingReference": this.bkgRef,
    "origin": null,
    "destination": null,
    "consignee": this.consignee.name,
    "shipper": this.shipper.name,
    "shipperReference": null,
    "forwarderReference": null,
    "contractNumber": null,
    "bookingOffice": null,
    "chargeType": null,
    "freightTerm": null,
    "payer": null,
    "comments": null,
    "bookingLegList": null,
    "cargoList": this.fieldArray,
    "partyList": [this.shipper, this.consignee]
  };


  createBooking() {
    this.jrnyArrParams = JSON.parse(this.journeyArr.toString());
    for (let i = 0; i < this.jrnyArrParams.length; i++) {
      this.jrnyArrParams[i]['mode'] = this.jrnyArrParams[i]['mode'].toUpperCase();
    }
    this.apiList.bookingLegList = this.jrnyArrParams;
    this.apiList.origin = this.jrnyArrParams[0].origin;
    this.apiList.destination = this.jrnyArrParams[2].destination;
    this.Booking.createBooking(this.apiList).
      subscribe(data => {
        console.log("create Booking");
        console.log(data.json().bookingReference);
        this.Booking.setBookingRef(data.json().bookingReference);
        this.router.navigate(['/bookingConfirmation/', data.json().bookingReference]);
      });
  }

  createFastBooking() {
    this.jrnyArrParams = JSON.parse(this.journeyArr.toString());
    for (let i = 0; i < this.jrnyArrParams.length; i++) {
      this.jrnyArrParams[i]['mode'] = this.jrnyArrParams[i]['mode'].toUpperCase();
    }
    this.apiList.bookingLegList = this.jrnyArrParams;
    this.apiList.origin = this.jrnyArrParams[0].origin;
    this.apiList.destination = this.jrnyArrParams[2].destination;

    this.apiList.cargoList[0].containerType = this.containerType;
    this.apiList.cargoList[0].containerCount = 1;
    this.apiList.cargoList[0].hsCode = this.comodity;

    this.Booking.createBooking(this.apiList).
      subscribe(data => {
        console.log("create Booking");
        console.log(data.json().bookingReference);
        this.Booking.setBookingRef(data.json().bookingReference);
        this.router.navigate(['/bookingConfirmation/', data.json().bookingReference]);
      });
  }

  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n) {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n) {
    console.log(n);
    let i;
    let slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { this.slideIndex = 1 }
    if (n < 1) { this.slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex - 1].style.display = "block";
    dots[this.slideIndex - 1].className += " active";
  }

  displayValue(item, val) {
    this.total = JSON.parse(this.journeyArr.toString())[0]['price'] + JSON.parse(this.journeyArr.toString())[1]['price'] + JSON.parse(this.journeyArr.toString())[2]['price'];
    if (item === 'comodity')
      this.comodity = val;
    else if (item === 'chargeType') {
      this.chargeType = val;
      this.apiList.chargeType = val;
    }
    else if (item == 'containerType') {
      this.containerType = val;
      if (val == '20RF' || val == '40RF' || val == '45RF') {
        this.reefer = 'Yes';
      } else {
        this.reefer = 'No';
      }
      this.updateJourney(val, 'bookingForm3');
    }
  }
}