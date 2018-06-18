import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking/booking.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.css']
})
export class BookingConfirmationComponent implements OnInit {
  private bkgRef: number;
  public bookingDetails: {};
  public todayDate;
  constructor(private Booking:BookingService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.todayDate = new Date();
    let bookingRef = parseInt(this.route.snapshot.paramMap.get('id'));
    debugger;
    this.bkgRef = bookingRef;
    console.log(this.bkgRef);
  
    //get booking details
    this.Booking.getBookingDetails(this.bkgRef).
    subscribe(data => {
       console.log(data.json());
       this.bookingDetails = data.json();
       console.log(this.bookingDetails[0].bookingReference);
   });
  }
    
  onPrint(){
        let printWindow;
        let innerContents = document.getElementById("printThis").innerHTML;
        printWindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        printWindow.document.open();
        printWindow.document.write('<html><style>.headerBar{position:fixed;width:100%;height:76px;z-index:2;border-bottom:8px solid #fff}.formBody{margin-top:85px}@media print{.printView{column-count:2;-webkit-column-count:2;-moz-column-count:2}.formBody{margin:0}.headerBar{display:none}}</style><body onload="window.print()">' + innerContents + '</html>');
        printWindow.document.close(); 
  }
}
