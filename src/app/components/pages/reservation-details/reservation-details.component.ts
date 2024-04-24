import { Component } from '@angular/core';
import { ReservationService } from '../../../services/reservation.service';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from '../../../shared/reservation.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { RoomService } from '../../../services/room.service';
import { HotelServicesService } from '../../../services/hotel-services.service';
import {  ReservationRoomDetails } from '../../../shared/reservationRooms.mode';

@Component({
  selector: 'app-reservation-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation-details.component.html',
  styleUrl: './reservation-details.component.css'
})
export class ReservationDetailsComponent {
  reservationId!:string;
  reservation:Reservation | undefined;
  services!: any[];
  activePhotoIndex: number = 0;
  roomsReservations!: ReservationRoomDetails[];
constructor(private reservationService:ReservationService,private roomService:RoomService,private hotelservice:HotelServicesService,private route:ActivatedRoute){}
ngOnInit(){
  this.reservationId = this.route.snapshot.paramMap.get('id') || '';
  this.getReservation();
  this.getServicesReservation(this.reservationId).subscribe(
    (response) => {
      this.services = response;
    }
  );
  this.getRoomReservation(this.reservationId).subscribe((data) => {
    this.roomsReservations = data;
  });
}
getReservation() {
  this.reservationService.getReservationById(this.reservationId).subscribe({
    next: (reservation: Reservation) => {
      this.reservation = reservation;
    },
    error: (error) => {
      console.error('Error fetching room:', error);
    },
  });
}
getRoomReservation(reservationId: any): Observable<any[]> {
  return this.roomService.getRoomsReservation(reservationId);
}
getServicesReservation(reservationId: any): Observable<any[]> {
  return this.hotelservice.getServicesReservation(reservationId);
}
setActivePhoto(index: number) {
  this.activePhotoIndex = index;
}
}
