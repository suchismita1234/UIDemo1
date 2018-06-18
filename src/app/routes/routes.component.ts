import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from './route.service';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {
  
  public allRouteDetails: any;
  journeyLeg: {};
  locationSearchedObj: {};
    public locationObj:{origin: '',destination:''};
    

    routekey: number ;
    journeyArr : {};

  chkindex: number;
    //public searchedParam = {};


    originList:{};
    destinationList:{};
  
  
  constructor(
  private data: ActivatedRoute,
  private Route: RouteService) { }

  ngOnInit() {
    
    this.Route.currentJrnyLeg.subscribe(journeyArr => this.journeyArr = JSON.stringify(journeyArr));
    this.Route.currentRoutekey.subscribe(routekey => this.routekey = routekey);
    this.Route.currentJourneyLeg.subscribe( journeyLeg => this.journeyLeg = journeyLeg);

this.locationObj = this.Route.getSearchParams();
console.log(this.locationObj);
  
    this.originList = [{id:"INDEL", name:"Delhi"}, 
            {id:"INCCU", name:"Kolkata"}];

    this.destinationList = [{id:"FRLIO", name:"Lyon"}, 
        {id:"FRMRS", name:"Marseille"}];
        
    
    this.Route.getRouteDetails(this.locationObj.origin, this.locationObj.destination).
    subscribe(data => {  
        this.allRouteDetails = data.json();
        this.journeyLeg = this.allRouteDetails[0].journeyLegs;
        this.Route.setjourneyLegs(this.journeyLeg);
        this.Route.setRoutekey(this.allRouteDetails[0].routekey);
    })
    
    this.chkindex = 0;//this is set to add active class
  }

  displayJourneyLegs(routeindex, routejourneyLegs, routeKey){
    this.journeyLeg= routejourneyLegs;   
    this.Route.setjourneyLegs(this.journeyLeg);
    this.chkindex = routeindex;
    this.Route.setRoutekey(routeKey);
  }

  findRoutes() {
    this.allRouteDetails = this.Route.getRouteDetails(this.locationObj.origin, this.locationObj.destination).
        subscribe(data => {
        this.allRouteDetails = data.json();
        this.journeyLeg= this.allRouteDetails[0].journeyLegs;
        this.Route.setjourneyLegs(this.journeyLeg);
        this.Route.setRoutekey(this.allRouteDetails[0].routekey);
        console.log(this.allRouteDetails);
    })  
  }
}