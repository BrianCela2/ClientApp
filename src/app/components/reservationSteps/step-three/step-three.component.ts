import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchService } from '../../../services/search-service.service';
import { CommonModule } from '@angular/common';
import { HotelServicesService } from '../../../services/hotel-services.service';

@Component({
  selector: 'step-three',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-three.component.html',
  styleUrl: './step-three.component.css',
})
export class StepThreeComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private service: HotelServicesService,
    private searchService: SearchService
  ) {}
  @Output() onStepCompleted = new EventEmitter();
  public services: any = [];
  public selectedServices: any = [];

  ngOnInit() {
    this.service.getHotelServices().subscribe((res) => {
      this.services = res;
      console.log(res);
    });
    this.onStepCompleted.emit();
  }

  addService(serviceId: any) {
    const selectedService = {
      serviceId: serviceId,
      dateOfPurchase: new Date(),
    };
    this.selectedServices.push(selectedService);
  }

  removeService(service: any) {
    const index = this.services.indexOf(service);
    if (index !== -1) {
      this.services.splice(index, 1);
    }
  }

  addServicesToReservation() {
    const reservation = this.searchService.getReservation();

    reservation.ReservationServices = this.selectedServices;

    this.searchService.setReservation(reservation);
  }
}
