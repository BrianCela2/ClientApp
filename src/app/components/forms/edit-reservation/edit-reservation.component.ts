import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../../../services/reservation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HotelServicesService } from '../../../services/hotel-services.service';

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
        this.reservationDTO = response;
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

  cancelReservation() {
    this.reservationService
      .updateReservationStatus(this.reservationId)
      .subscribe({
        next: (response) => {
          console.log('Reservation status updated successfully', response);
        },
        error: (error) => {
          console.error('Error updating status:', error);
        },
      });
  }

  addServices() {
    this.hotelService.getHotelServices().subscribe((res) => {
      this.services = res;
      console.log(res);
    });
    this.displayTable = true;
  }

  addService(serviceId: any) {
    const selectedService = {
      serviceId: serviceId,
      dateOfPurchase: new Date(),
    };
    this.selectedServices.push(selectedService);
  }

  removeService(service: any) {
    const index = this.services.indexOf(service);
    if (index !== -1) {
      this.services.splice(index, 1);
    }
  }
}
