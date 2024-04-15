import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SearchService } from '../../../services/search-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'step-three',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-three.component.html',
  styleUrl: './step-three.component.css'
})
export class StepThreeComponent {

  constructor(private http: HttpClient,private searchService: SearchService){}
  reservationDTO=this.searchService.getReservation()

  createReservation() {
    this.http
      .post<any>('https://localhost:7006/api/Reservation', this.reservationDTO)
      .subscribe({
        next: (response) => {
          console.log('Reservation created successfully:', response);
        },
        error: (error) => {
          console.error('Error creating reservation:', error);
          console.log(this.reservationDTO);
        },
      });
  }
}
