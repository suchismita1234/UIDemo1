import { Component, OnInit } from '@angular/core';

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
    message: string;
	  
	constructor(private router: Router) {}

	ngOnInit() {	
	  this.location = {origin: '', destination: ''};
    }
    onSubmit(locationForm) {
	  	//console.log(locationForm);
	  	this.origin1 = this.location.origin;
        this.dest =  this.location.destination;
        this.router.navigate(['/routes']);
    }

	  getRoutes() {
	  	console.log("here");
	  	//console.log(ngForm.origin);
	  }
}
