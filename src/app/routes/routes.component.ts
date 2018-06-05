import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from './route.service';




@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {
	
	public allRouteDetails: {};
	journeyLeg: {};
	locationSearchedObj: {};
  locationObj:{origin: '',destination:''};
	chkindex: number;
   	//public searchedParam = {};


    originList:{};
    destinationList:{};

  
  //console.log(locationObj);
  constructor(
  private data: ActivatedRoute,
  private Route: RouteService) { }

  ngOnInit() {

this.locationObj = this.Route.getSearchParams();
console.log(this.locationObj);
  debugger;
    this.originList = [{id:"INDEL", name:"Delhi"}, 
            {id:"INCCU", name:"Kolkata"}];

  this.destinationList = [{id:"FRLIO", name:"Lyon"}, 
        {id:"FRMRS", name:"Marseille"}];
    //console.log("inside routes get location");
    //console.log(this.Route.getSearchParams());
  	
    //this.Route.locationArr;
  	
    
    this.Route.getRouteDetails(this.locationObj.origin, this.locationObj.destination).
    subscribe(data => {
      this.allRouteDetails = data.list;
      this.journeyLeg= this.allRouteDetails[1].journeyLegs;
      console.log("here");
      console.log(this.allRouteDetails);return;
   	})   
    
  	this.chkindex = 0;//this is set to add active class
  }

  displayJourneyLegs(routeindex, routejourneyLegs){
    this.journeyLeg= routejourneyLegs;
    this.chkindex = routeindex;

  }

  findRoutes() {
  	this.allRouteDetails = this.Route.getRouteDetails(this.locationObj.origin, this.locationObj.destination);
  }
}