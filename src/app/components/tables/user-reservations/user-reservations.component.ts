import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReservationService } from '../../../services/reservation.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { UserRoleService } from '../../../services/user-role.service';
import { RoomService } from '../../../services/room.service';
import { HotelServicesService } from '../../../services/hotel-services.service';
import { Router } from '@angular/router';
import { SortingComponent } from '../../tablePagination/sorting/sorting.component';
import { PaginationComponent } from '../../tablePagination/pagination/pagination.component';
import { ReservationStatusEnum } from '../../../shared/reservation.model';

@Component({
  selector: 'app-user-reservations',
  standalone: true,
  imports: [CommonModule, SortingComponent, PaginationComponent],
  templateUrl: './user-reservations.component.html',
  styleUrl: './user-reservations.component.css',
})
export class UserReservationsComponent implements OnInit {
  reservations!: any[];
  roomsNumbers!: any[];
  services!: any[];
  selectedReservation: any;
  role: any;

  public totalPages!: number;
  public currentPage: number = 1;
  public pageSize: number = 10;
  public sortField: string = 'ReservationDate';
  public sortOrder: string = 'asc';
  public searchString: string = '';
  sortOptions: { value: string; label: string }[] = [
    { value: 'ReservationDate', label: 'ReservationDate' },
    { value: 'TotalPrice', label: 'TotalPrice' },
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
    private router: Router
  ) {}
  ngOnInit() {
    this.fetchReservations();
    this.userRole.getRole().subscribe((val) => {
      const roleFromToken = this.authService.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }

  fetchReservations() {
    console.log(this.sortField)
    this.reservationService
      .getReservationOfUser(
        this.currentPage,
        this.pageSize,
        this.sortField,
        this.sortOrder,
        this.searchString
      )
      .subscribe((res) => {
        console.log(res)
        this.reservations = res.reservations;
        this.totalPages = res.totalPages;
        this.cdr.detectChanges();
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

  getRoomReservation(reservationId: any): Observable<any[]> {
    return this.roomService.getRoomsReservation(reservationId);
  }
  getServicesReservation(reservationId: any): Observable<any[]> {
    return this.hotelService.getServicesReservation(reservationId);
  }
  GoToEdit(id: string) {
    this.router.navigateByUrl('Reservations/Edit/' + id);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchReservations();
  }

  onSortChange(sort: { field: string; order: string }) {
    console.log(sort)
    this.sortField = sort.field;
    this.sortOrder = sort.order;
    this.fetchReservations();
  }
}
