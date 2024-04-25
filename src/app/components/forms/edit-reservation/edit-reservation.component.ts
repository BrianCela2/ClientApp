import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReservationService } from '../../../services/reservation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HotelServicesService } from '../../../services/hotel-services.service';
import { formatDateTimeToDate } from '../../../helpers/formatDateTimeToDate';
import { Observable } from 'rxjs';
import { PopupService } from '../../../services/popup.service';

@Component({
  selector: 'app-edit-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-reservation.component.html',
  styleUrl: './edit-reservation.component.css',
})
export class EditReservationComponent {
  reservationId!: string;
  reservationDTO: any = {};
  reservationRooms: any;
  serviceDetails: any[] = [];
  services: any = [];
  userServices!: any;
  displayTable: boolean = false;
  public selectedServices: any = [];
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private hotelService: HotelServicesService,
    private _toasterService: PopupService
  ) {}
  ngOnInit(): void {
    this.reservationId = this.route.snapshot.paramMap.get('id') || '';
    this.reservationService.getReservationById(this.reservationId).subscribe({
      next: (response: any) => {
        this.reservationDTO = response;
        this.reservationDTO.reservationRooms.forEach((room: any) => {
          room.checkInDate = formatDateTimeToDate(room.checkInDate);
          room.checkOutDate = formatDateTimeToDate(room.checkOutDate);
        });
        this.getServicesReservation(
          this.reservationDTO.reservationId
        ).subscribe((response) => {
          this.userServices = response;
        });
      },
      error: (error) => {
        console.error('Error fetching room data:', error);
      },
    });
  }
  isServiceSelected(serviceId: any): boolean {
    console.log(this.selectedServices);
    return this.selectedServices.some((s: any) => s.serviceId === serviceId);
  }
  updateReservation(): void {
    this.reservationDTO.reservationServices = this.selectedServices;
    this.reservationService
      .updateReservation(this.reservationId, this.reservationDTO)
      .subscribe({
        next: (response) => {
          console.log('Reservation updated successfully', response);
          this.getServicesReservation(
            this.reservationDTO.reservationId
          ).subscribe((response) => {
            this.userServices = response;
            this._toasterService.success('Reservation updated successfully');
            this.router.navigateByUrl('YourReservations')
          });
        },
        error: (error) => {
          console.error('Error updating reservation:', error);
          this._toasterService.danger('Something went wrong');
        },
        complete: () => {
          this.displayTable = false;
        },
      });
  }

  cancelReservation(event: Event) {
    event.preventDefault();
    this.reservationService
      .updateReservationStatus(this.reservationId, 2)
      .subscribe({
        next: (response) => {
          console.log('Reservation status updated successfully', response);
          this._toasterService.success(
            'Reservation status updated successfully'
          );
        },
        error: (error) => {
          console.error('Error updating status:', error);
          this._toasterService.danger('Something went wrong. Please try again');
        },
        complete: () => {
          this.router.navigateByUrl('/YourReservations');
        },
      });
  }

  addServices(event: Event) {
    event.preventDefault();
    this.hotelService.getHotelServices().subscribe((res) => {
      this.services = res;
      console.log(res);
    });
    this.displayTable = true;
  }

  addService(serviceId: string, event: Event) {
    event.preventDefault();
  
    const alreadyAdded = this.userServices.some(
      
      (service: any) => service.serviceID === serviceId
    );
  
    if (alreadyAdded) {
      this._toasterService.warning('This service is already added to the reservation.');
      return;
    }
  
    const selectedService = {
      serviceId: serviceId,
      dateOfPurchase: new Date(),
    };
  
    this.selectedServices.push(selectedService);
  }
  

  removeService(i: number, event: Event) {
    event.preventDefault();
    const index = this.services.indexOf(i);
    if (index !== -1) {
      this.services.splice(index, 1);
    }
  }
  getServicesReservation(reservationId: any): Observable<any[]> {
    return this.hotelService.getServicesReservation(reservationId);
  }
}
