import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ReservationService } from '../../../services/reservation.service';
import { UserRoleService } from '../../../services/user-role.service';
import { AuthService } from '../../../services/auth.service';
import { RoomService } from '../../../services/room.service';
import { RoomDetailsComponent } from '../../../rooms/room-details/room-details.component';
import { Observable } from 'rxjs';
import { HotelServicesService } from '../../../services/hotel-services.service';
import { SortingComponent } from '../../tablePagination/sorting/sorting.component';
import { PaginationComponent } from '../../tablePagination/pagination/pagination.component';
import { SearchComponent } from '../../tablePagination/search/search.component';
import {
  Reservation,
  ReservationStatusEnum,
} from '../../../shared/reservation.model';
import { PopupService } from '../../../services/popup.service';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [
    CommonModule,
    RoomDetailsComponent,
    SortingComponent,
    PaginationComponent,
    SearchComponent,
  ],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css',
})
export class ReservationsComponent {
  public reservations: Reservation[] = [];
  public role!: string;
  selectedReservation?: Reservation;
  roomsNumbers!: any[];
  services!: any[];

  public currentPage: number = 1;
  public totalPages!: number;
  public pageSize: number = 10;
  public sortField: string = 'ReservationDate';
  public sortOrder: string = 'asc';
  public searchString: string = '';
  sortOptions: { value: string; label: string }[] = [
    { value: 'ReservationDate', label: 'Reservation Date' },
    { value: 'TotalPrice', label: 'Price' },
  ];
  public get reservationStatusEnum(): typeof ReservationStatusEnum {
    return ReservationStatusEnum;
  }
  constructor(
    private reservationService: ReservationService,
    private userRole: UserRoleService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private roomService: RoomService,
    private hotelService: HotelServicesService,
    private _toasterService: PopupService
  ) {}
  ngOnInit() {
    this.fetchReservations();
      this.role = this.authService.getRoleFromToken();
  }

  fetchReservations() {
    this.reservationService
      .getReservations(
        this.currentPage,
        this.pageSize,
        this.sortField,
        this.sortOrder,
        this.searchString
      )
      .subscribe((res) => {
        console.log(res);
        this.reservations = res.reservations;
        this.totalPages = res.totalPages;
      });
    this.cdr.detectChanges();
  }
  showReservationDetails(reservation: Reservation) {
    if (this.selectedReservation === reservation) {
      this.selectedReservation = undefined;
    } else {
      this.selectedReservation = reservation;
      this.getRoomReservation(reservation.reservationId).subscribe((data) => {
        this.roomsNumbers = data;
      });
      this.getServicesReservation(reservation.reservationId).subscribe(
        (response) => {
          this.services = response;
        }
      );
    }
  }
  confirmStatusUpdate(reservationId: string, status: number): void {
    if (
      window.confirm('Are you sure you want to change status of Reservation?')
    ) {
      this.statusUpdate(reservationId, status);
    }
  }
  statusUpdate(reservationId: string, status: number) {
    this.reservationService
      .updateReservationStatus(reservationId, status)
      .subscribe({
        next: (response) => {
          console.log('Reservation Status has updated successfully');
          this._toasterService.success('Reservation Status has updated successfully');
          const index = this.reservations.findIndex(
            (reservation: { reservationId: string }) =>
              reservation.reservationId === reservationId
          );
          if (index !== -1) {
            if (status == 1) {
              this.reservations[index].reservationStatus =
                ReservationStatusEnum.Confirmed;
            } else {
              this.reservations[index].reservationStatus =
                ReservationStatusEnum.Canceled;
            }
          }
        },
        error: (error) => {
          console.error('Error updating Reservation:', error);
          this._toasterService.danger('Error updating reservation');
        },
      });
  }
  getRoomReservation(reservationId: any): Observable<any[]> {
    return this.roomService.getRoomsReservation(reservationId);
  }
  getServicesReservation(reservationId: any): Observable<any[]> {
    return this.hotelService.getServicesReservation(reservationId);
  }
  confirmReservationDelete(reservationId: string): void {
    if (window.confirm('Are you sure you want to delete the Room?')) {
      this.DeleteReservation(reservationId);
    }
  }
  DeleteReservation(reservationId: string) {
    this.reservationService.ReservationDelete(reservationId).subscribe({
      next: (data) => {
        this.cdr.detectChanges();
        this._toasterService.success('Reservation deleted successfully');
        console.log('Delete successful');
        this.fetchReservations();
      },
      error: (error) => {
        console.error('There was an error!', error);
        this._toasterService.danger('Something went wrong');
      },
    });
  }
  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchReservations();
  }

  onSortChange(sort: { field: string; order: string }) {
    this.sortField = sort.field;
    this.sortOrder = sort.order;
    this.fetchReservations();
  }

  onSearchChange(searchString: string) {
    this.searchString = searchString;
    this.fetchReservations();
  }
}
