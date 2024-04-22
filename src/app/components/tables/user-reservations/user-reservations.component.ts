import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReservationService } from '../../../services/reservation.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { UserRoleService } from '../../../services/user-role.service';
import { RoomService } from '../../../services/room.service';
import { HotelServicesService } from '../../../services/hotel-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-reservations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-reservations.component.html',
  styleUrl: './user-reservations.component.css'
})
export class UserReservationsComponent implements OnInit{
  reservations!:any[];
  roomsNumbers!:any[];
services!:any[];
  selectedReservation: any;
  role: any;
constructor(private reservationService:ReservationService,private userRole:UserRoleService,
  private authService:AuthService,private cdr:ChangeDetectorRef,private roomService:RoomService,private hotelService:HotelServicesService,private router:Router){}
ngOnInit() {
  this.reservationService.getReservationOfUser()
  .subscribe(res=>{
    this.reservations = res;
    console.log(this.reservations);
    this.cdr.detectChanges();
  });

  this.userRole.getRole()
  .subscribe(val=>{
    const roleFromToken = this.authService.getRoleFromToken();
    this.role = val || roleFromToken;
  })
}
showReservationDetails(reservation: any) {
  if (this.selectedReservation === reservation) {
    this.selectedReservation = null; 
  } else {
    this.selectedReservation = reservation;
    this.getRoomReservation(reservation.reservationId).subscribe(data => {
      this.roomsNumbers = data;
    });
    this.getServicesReservation(reservation.reservationId).subscribe(response => {
      this.services = response;
    });
  }
}

getRoomReservation(reservationId: any): Observable<any[]> {
  return this.roomService.getRoomsReservation(reservationId);
}
getServicesReservation(reservationId:any):Observable<any[]>{
  return this.hotelService.getServicesReservation(reservationId);
}
GoToEdit(id:string){
  this.router.navigateByUrl('Reservations/Edit/'+id);
}
}
