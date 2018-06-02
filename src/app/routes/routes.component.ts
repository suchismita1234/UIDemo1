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
	locationObj: {};
	locationSearchedObj: {};
	origin:{};
	destination: {};
	chkindex: number;
   	//public searchedParam = {};

  constructor(
  private data: ActivatedRoute,
  private Route: RouteService) { }

  ngOnInit() {
debugger;
  	this.locationObj = this.Route.locationArr;
  	this.allRouteDetails = this.Route.getRouteDetails(this.locationObj.origin, this.locationObj.destination);
 	this.journeyLeg= this.allRouteDetails[1].journeyLegs;
  	this.chkindex = 0;//this is set to add active class
  }

  displayJourneyLegs(routeindex, routejourneyLegs){
    this.journeyLeg= routejourneyLegs;
    this.chkindex = routeindex;

  }

  findRoutes() {
  	console.log("router search form submit");
  }
}