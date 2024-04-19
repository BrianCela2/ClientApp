import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../../../services/reservation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HotelServicesService } from '../../../services/hotel-services.service';
import { formatDateTimeToDate } from '../../../helpers/formatDateTimeToDate';
import { ReservationStatusEnum } from '../../../shared/reservation.model';

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
  displayTable: boolean = false;
  public selectedServices: any = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private hotelService: HotelServicesService
  ) {}
  ngOnInit(): void {
    this.reservationId = this.route.snapshot.paramMap.get('id') || '';
    this.reservationService.getReservationById(this.reservationId).subscribe({
      next: (response: any) => {
        this.reservationDTO=response;
        this.reservationDTO.reservationRooms.forEach((room: any) => {
          room.checkInDate = formatDateTimeToDate(room.checkInDate);
          room.checkOutDate = formatDateTimeToDate(room.checkOutDate);
        });
        this.reservationDTO.reservationServices.forEach((service: any) => {
          this.hotelService.getServiceById(service.serviceId).subscribe({
            next: (service) => {
              this.serviceDetails.push(service);
            },
            error: (error) => {
              console.error('Error getting service details:', error);
            },
          });
        });
      },
      error: (error) => {
        console.error('Error fetching room data:', error);
      },
    });
  }

  updateReservation(): void {
    this.reservationDTO.reservationServices = this.selectedServices;
    console.log('res',this.reservationDTO)
    this.reservationService
      .updateReservation(this.reservationId, this.reservationDTO)
      .subscribe({
        next: (response) => {
          console.log('Room updated successfully', response);
        },
        error: (error) => {
          console.error('Error updating room:', error);
        },
        complete: () => {},
      });
  }

  cancelReservation(event: Event) {
    event.preventDefault()
    this.reservationService
      .updateReservationStatus(this.reservationId,2)
      .subscribe({
        next: (response) => {
          console.log('Reservation status updated successfully', response);
        },
        error: (error) => {
          console.error('Error updating status:', error);
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
}
