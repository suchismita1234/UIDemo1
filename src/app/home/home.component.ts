import { Component, OnInit } from '@angular/core';
import { RouteService } from '../routes/route.service';
import { AppService } from '../app.service';

import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	public origin1: string;
	public dest: string;
	
	location: any;
  //message: string;
	  
	constructor(
	private router: Router,
	private Route: RouteService,
	private apService: AppService

	) {}

	public message = "hello";

	ngOnInit() {	
	  this.location = {origin: 'Marseille', destination: 'Manhantten'};
    }
    onSubmit(event) {
     	this.origin1 = this.location.origin;
        this.dest =  this.location.destination;

       // this.getLocationList();



        //RouteList Fetched From routeService
       // this.Route.getRouteDetails(this.origin1, this.dest );
        //console.log(this.Route.getRouteDetails(this.origin1, this.dest );

        this.Route.setSearchParams(this.location);
        //this.Route.setRouteDetails(this.Route.getRouteDetails(this.origin1, this.dest);

        this.router.navigate(['/routes']);
    }

	  getRoutes() {
	  	console.log("here");
	  	//console.log(ngForm.origin);
	  }
}
