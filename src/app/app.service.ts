import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public originList: {};
  public destinationList: {};

  constructor() { }

  getLocationList() {
    
        this.originList =  [{id:"INDEL", name:"Delhi"}, 
            {id:"INCCU", name:"Kolkata"}];
    
    
        this.destinationList = [{id:"FRLIO", name:"Lyon"}, 
        {id:"FRMRS", name:"Marseille"}];  
    
  }
}