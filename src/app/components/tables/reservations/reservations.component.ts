import { CommonModule } from '@angular/common';
import { ChangeDetectorRef ,Component } from '@angular/core';
import { ReservationService } from '../../../services/reservation.service';
import { UserRoleService } from '../../../services/user-role.service';
import { AuthService } from '../../../services/auth.service';
import { RoomService } from '../../../services/room.service';
import { RoomDetailsComponent } from '../../../rooms/room-details/room-details.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule,RoomDetailsComponent],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent {
public reservations:any=[];
public role!:string;
selectedReservation: any;
roomsNumbers!:any[];
constructor(private reservationService:ReservationService,private userRole:UserRoleService,
  private authService:AuthService,private cdr:ChangeDetectorRef,private roomService:RoomService){}
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
showReservationDetails(reservation: any) {
  if (this.selectedReservation === reservation) {
    this.selectedReservation = null; 
  } else {
    this.selectedReservation = reservation;
    this.getRoomReservation(reservation.reservationId).subscribe(data => {
      this.roomsNumbers = data;
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
        if(status==1){
        this.reservations[index].reservationStatus = 'Confirmed'; 
        }else{
          this.reservations[index].reservationStatus = 'Canceled'; 
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
}
