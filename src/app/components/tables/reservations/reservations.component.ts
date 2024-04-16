import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReservationService } from '../../../services/reservation.service';
import { UserRoleService } from '../../../services/user-role.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent {
public reservations:any=[];
public role!:string;
selectedReservation: any;
constructor(private reservationService:ReservationService,private userRole:UserRoleService,private authService:AuthService){}
ngOnInit() {
  this.reservationService.getReservations()
  .subscribe(res=>{
  this.reservations = res;
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
  }
}

}
