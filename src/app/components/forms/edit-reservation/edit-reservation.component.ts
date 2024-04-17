import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../../../services/reservation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-reservation',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './edit-reservation.component.html',
  styleUrl: './edit-reservation.component.css'
})
export class EditReservationComponent {
reservationId!:string;
reservationDTO:any={};
reservationRooms:any;

constructor(private router:Router,private route: ActivatedRoute, private reservationService: ReservationService) {}
ngOnInit(): void {
  this.reservationId = this.route.snapshot.paramMap.get('id') || '';
  this.reservationDTO = {
    reservationId: this.reservationId,
    reservationRooms: [] 
  };
  this.reservationService.getReservationById(this.reservationId).subscribe({
    next: (response: any) => {
      this.reservationDTO.reservationId = response.id;
      this.reservationDTO.reservationRooms = response.reservationRooms;
      // this.reservationDTO.reservationRooms.forEach((reservationRooms:any) => {
      //   reservationRooms.checkInDate = new Date(reservationRooms.checkInDate);
      //   reservationRooms.checkOutDate = new Date(reservationRooms.checkOutDate);
      // });
      console.log(response);
    },
    error: (error) => {
      console.error('Error fetching room data:', error);
    }
  });
}
updateReservation(): void {
  this.reservationService.updateReservation(this.reservationId, this.reservationDTO).subscribe({
    next: (response) => {
      console.log('Room updated successfully',response);
    },
    error: (error) => {
      console.error('Error updating room:', error);
    },
    complete: () => {
    }
  });
}
}
