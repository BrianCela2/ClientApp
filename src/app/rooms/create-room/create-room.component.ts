import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoomService } from '../../services/room.service';
import { CreateRoomDTO } from '../../shared/room.model';
import { FormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-create-room',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-room.component.html',
  styleUrl: './create-room.component.css',
})
export class CreateRoomComponent implements OnInit {
  rooms: any[] = [];
  newRoom: any = {};
  public currentPage: number = 1;
  public pageSize: number = 10;
  public sortField: string = 'Capacity';
  public sortOrder: string = 'asc';
  sortOptions: { value: string; label: string }[] = [
    { value: 'Capacity', label: 'Capacity' },
    { value: 'RoomNumber', label: 'Room Number' },
    { value: 'Price', label: 'Price' },
    { value: 'Category', label: 'Category' },
  ];
  room: CreateRoomDTO = { roomNumber: 0, capacity: 0, price: 0, photos: [] };
  private roomsSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private roomService: RoomService,
    private _toasterService: PopupService
  ) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    this.roomsSubscription = this.roomService
      .getRooms(this.currentPage, this.pageSize, this.sortField, this.sortOrder)
      .subscribe({
        next: (data: any) => {
          this.rooms = data;
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }

  onSubmit() {
    console.log('Room data:', this.room);
    this.roomService.createRoom(this.room).subscribe({
      next: (response: any) => {
        console.log('Room created successfully:', response);
        this._toasterService.success('Room created successfully');
      },
      error: (error: any) => {
        console.error('Error creating room:', error);
        this._toasterService.danger('Something went wrong');
      },
    });
    this.router.navigateByUrl('/Room/GetAll');
  }

  resetForm() {
    this.room = { roomNumber: 0, capacity: 0, price: 0, photos: [] };
  }

  onFileChange(event: any) {
    this.room.photos = event.target.files;
  }

  ngOnDestroy(): void {
    if (this.roomsSubscription) {
      this.roomsSubscription.unsubscribe();
    }
  }
}
