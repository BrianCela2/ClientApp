import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SearchService } from '../../../services/search-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'step-four',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-four.component.html',
  styleUrl: './step-four.component.css'
})
export class StepFourComponent {

  constructor(private http: HttpClient,private searchService: SearchService){}
  reservationDTO=this.searchService.getReservation()

  createReservation() {
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
