import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../services/search-service.service';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../../services/reservation.service';

@Component({
  selector: 'step-four',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-four.component.html',
  styleUrl: './step-four.component.css'
})
export class StepFourComponent implements OnInit {
  constructor(private http: HttpClient,private searchService: SearchService, private reservation:ReservationService){}
  reservationDTO: any; 
  totalPrice: any;

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
      }
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
