import { CommonModule } from '@angular/common';
import { ChangeDetectorRef ,Component } from '@angular/core';
import { ReservationService } from '../../../services/reservation.service';
import { UserRoleService } from '../../../services/user-role.service';
import { AuthService } from '../../../services/auth.service';
import { RoomService } from '../../../services/room.service';
import { RoomDetailsComponent } from '../../../rooms/room-details/room-details.component';
import { Observable } from 'rxjs';
import { HotelServicesService } from '../../../services/hotel-services.service';
import { Reservation, ReservationStatusEnum } from '../../../shared/reservation.model';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule,RoomDetailsComponent],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent {
public reservations:Reservation[]=[];
public role!:string;
selectedReservation!: Reservation;
roomsNumbers!:any[];
services!:any[];
public get reservationStatusEnum(): typeof ReservationStatusEnum {
  return ReservationStatusEnum; 
}constructor(private reservationService:ReservationService,private userRole:UserRoleService,
  private authService:AuthService,private cdr:ChangeDetectorRef,private roomService:RoomService,private hotelService:HotelServicesService){}
ngOnInit() {
  this.reservationService.getReservations()
  .subscribe(res=>{
    this.reservations = res;
    this.cdr.detectChanges();
    console.log(res);
  });

  this.userRole.getRole()
  .subscribe(val=>{
    console.log(val)
    const roleFromToken = this.authService.getRoleFromToken();
    console.log(roleFromToken)
    this.role = val || roleFromToken;
  })
}
showReservationDetails(reservation: Reservation) {
  if (this.selectedReservation === reservation) {
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
confirmStatusUpdate(reservationId: string, status: number): void {
  if (window.confirm('Are you sure you want to change status of Reservation?')) {
    this.statusUpdate(reservationId, status);
  }
}
statusUpdate(reservationId: string, status: number) {
  this.reservationService.updateReservationStatus(reservationId, status).subscribe({
    next: (response) => {
      console.log('Reservation Status has updated successfully');
      
      const index = this.reservations.findIndex((reservation: { reservationId: string; }) => reservation.reservationId === reservationId);
      if (index !== -1) {
        if (status == 1) {
            this.reservations[index].reservationStatus = ReservationStatusEnum.Confirmed;
        } else {
            this.reservations[index].reservationStatus = ReservationStatusEnum.Canceled;
        }
    }
    
    },
    error: (error) => {
      console.error('Error updating Reservation:', error);
    }
  });
}  
getRoomReservation(reservationId: any): Observable<any[]> {
  return this.roomService.getRoomsReservation(reservationId);
}
getServicesReservation(reservationId:any):Observable<any[]>{
  return this.hotelService.getServicesReservation(reservationId);
}
confirmReservationDelete(reservationId: string): void {
  if (window.confirm('Are you sure you want to delete the Room?')) {
    this.DeleteReservation(reservationId);
  }
}
DeleteReservation(reservationId:string){
  this.reservationService.ReservationDelete(reservationId)
    .subscribe({
        next: data => {
          this.cdr.detectChanges();
          console.log('Delete successful');
        },
        error: error => {
            console.error('There was an error!', error);
        }
    });
    
}
}
