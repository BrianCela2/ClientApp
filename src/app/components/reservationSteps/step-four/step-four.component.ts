import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../services/search-service.service';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../../services/reservation.service';
import { HotelServicesService } from '../../../services/hotel-services.service';

@Component({
  selector: 'step-four',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-four.component.html',
  styleUrl: './step-four.component.css'
})
export class StepFourComponent implements OnInit {
  constructor(private http: HttpClient,private searchService: SearchService, private reservation:ReservationService, private hotelService:HotelServicesService){}
  reservationDTO: any; 
  totalPrice: any;
  serviceDetails: any[] = [];

  ngOnInit(): void {
    this.reservationDTO = this.searchService.getReservation();  
    this.reservation.GetReservationPrice(this.reservationDTO).subscribe({
      next: (response) => {
        this.totalPrice = response;
        console.log(this.totalPrice);
      },
      error: (error) => {
        console.error('Error getting reservation price:', error);
      }
    });
    console.log(this.reservationDTO)
    this.reservationDTO.reservationServices.forEach((service: any) => {
      this.hotelService.getServiceById(service.serviceId).subscribe({
        next: (service) => {
          this.serviceDetails.push(service); // Push service details to array
        },
        error: (error) => {
          console.error('Error getting service details:', error);
        }
      });
    });
  }
  
  createReservation() {
    console.log('res',this.reservationDTO)
    this.http
      .post<any>('https://localhost:7006/api/Reservation', this.reservationDTO)
      .subscribe({
        next: (response) => {
          console.log('Reservation created successfully:', this.reservationDTO);
        },
        error: (error) => {
          console.error('Error creating reservation:', error);
          console.log(this.reservationDTO);
        },
      });
  }
}
