import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../services/search-service.service';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../../services/reservation.service';
import { HotelServicesService } from '../../../services/hotel-services.service';
import {
  Reservation,
  ReservationSample,
} from '../../../shared/reservation.model';
import { PopupService } from '../../../services/popup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'step-four',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-four.component.html',
  styleUrl: './step-four.component.css',
})
export class StepFourComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private searchService: SearchService,
    private reservation: ReservationService,
    private hotelService: HotelServicesService,
    private _toasterService: PopupService,
    private router: Router,
  ) {}
  reservationDTO!: ReservationSample;
  totalPrice!: number;
  serviceDetails: any[] = [];

  ngOnInit(): void {
    this.reservationDTO = this.searchService.getReservation();
    console.log(this.reservationDTO);
    this.reservation.GetReservationPrice(this.reservationDTO).subscribe({
      next: (response) => {
        this.totalPrice = response;
        console.log(this.totalPrice);
      },
      error: (error) => {
        console.error('Error getting reservation price:', error);
      },
    });
    this.reservationDTO.ReservationServices?.forEach((service: any) => {
      this.hotelService.getServiceById(service.serviceId).subscribe({
        next: (service) => {
          this.serviceDetails.push(service);
        },
        error: (error) => {
          console.error('Error getting service details:', error);
        },
      });
    });
  }

  createReservation() {
    this.http
      .post<any>('https://localhost:7006/api/Reservation', this.reservationDTO)
      .subscribe({
        next: (response) => {
          this._toasterService.success('Reservation created successfully');
          console.log('Reservation created successfully:', this.reservationDTO);
          this.router.navigate(['dashboard']);
        },
        error: (error) => {
          console.error('Error creating reservation:', error);
          console.log(this.reservationDTO);
        },
      });
  }
}
