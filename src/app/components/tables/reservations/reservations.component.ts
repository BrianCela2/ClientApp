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

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule, RoomDetailsComponent,SortingComponent,PaginationComponent,SearchComponent],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css',
})
export class ReservationsComponent {
  public reservations: any = [];
  public role!: string;
  selectedReservation: any;
  roomsNumbers!: any[];
  services!: any[];

  public currentPage: number = 1;
  public pageSize: number = 10;
  public sortField: string = 'ReservationDate';
  public sortOrder: string = 'asc';
  public searchString: string = '';
  sortOptions: { value: string; label: string }[] = [
    { value: 'ReservationDate', label: 'Reservation Date' },
    { value: 'TotalPrice', label: 'Total Price' },
  ];

  constructor(
    private reservationService: ReservationService,
    private userRole: UserRoleService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private roomService: RoomService,
    private hotelService: HotelServicesService
  ) {}
  ngOnInit() {
    this.fetchReservations()
    this.userRole.getRole().subscribe((val) => {
      console.log(val);
      const roleFromToken = this.authService.getRoleFromToken();
      console.log(roleFromToken);
      this.role = val || roleFromToken;
    });
  }
  
  fetchReservations() {
    console.log(this.sortField,this.sortOrder)
    this.reservationService.getReservations(this.currentPage, this.pageSize, this.sortField, this.sortOrder, this.searchString)
      .subscribe(res => {
        console.log(res)
        this.cdr.detectChanges();
        this.reservations = res;
      });
  }
  showReservationDetails(reservation: any) {
    if (this.selectedReservation === reservation) {
      this.selectedReservation = null;
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

          const index = this.reservations.findIndex(
            (reservation: { reservationId: string }) =>
              reservation.reservationId === reservationId
          );
          if (index !== -1) {
            if (status == 1) {
              this.reservations[index].reservationStatus = 'Confirmed';
            } else {
              this.reservations[index].reservationStatus = 'Canceled';
            }
          }
        },
        error: (error) => {
          console.error('Error updating Reservation:', error);
        },
      });
  }
  getRoomReservation(reservationId: any): Observable<any[]> {
    return this.roomService.getRoomsReservation(reservationId);
  }
  getServicesReservation(reservationId: any): Observable<any[]> {
    return this.hotelService.getServicesReservation(reservationId);
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
