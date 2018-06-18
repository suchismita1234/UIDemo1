import { Component, OnInit } from '@angular/core';
import { RouteService } from '../routes/route.service';
import { AppService } from '../app.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	public origin1: string;
	public dest: string;
	public startDate: Date;
	
	location: any;
	originList: {};
	destinationList: {};
  //message: string;
	 cacheLocArr: {};

	constructor(
	private router: Router,
	private Route: RouteService,
	private appService: AppService

	) {}

	public message = "hello";

	ngOnInit() {	
	  	this.originList = [{id:"FRMRS", name:"Marseille"}];

    	this.destinationList = [{id:"USMNH", name:"Manhattan"}];
 		
 		//cacheLocArr = this.appService.getLocationList();
 		
 		this.location = {origin: '', destination: ''};
    }
    onSubmit(event) {
     	this.origin1 = this.location.origin;
        this.dest =  this.location.destination;
        this.Route.setSearchParams(this.location, this.startDate);
        this.router.navigate(['/routes']);
    }

	  getRoutes() {
	  	console.log("here");
	  }
}
