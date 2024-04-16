import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SearchService } from '../../../services/search-service.service';
import { CommonModule } from '@angular/common';
import { HotelServicesService } from '../../../services/hotel-services.service';

@Component({
  selector: 'step-three',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-three.component.html',
  styleUrl: './step-three.component.css'
})
export class StepThreeComponent {

  constructor(private http: HttpClient,private service: HotelServicesService,private searchService: SearchService){}
  public services:any = [];
  public selectedServices:any=[];

  ngOnInit() {
    this.service.getHotelServices()
    .subscribe(res=>{
    this.services = res;
    console.log(res)
    });
  }

  addService(serviceId: any) {
    const selectedService = {
        serviceId: serviceId,
        dateOfPurchase:  new Date()
    };
    this.selectedServices.push(selectedService);
}

  removeService(service:any) {
    const index = this.services.indexOf(service);
    if (index !== -1) {
      this.services.splice(index, 1);
    }
  }
  addServicesToReservation() {
    const reservation = this.searchService.getReservation();

    reservation.reservationServices = this.selectedServices;

    this.searchService.setReservation(reservation);

  }
}
