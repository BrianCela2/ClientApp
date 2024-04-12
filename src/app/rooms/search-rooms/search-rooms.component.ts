import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RoomListComponent } from '../room-list/room-list.component';

@Component({
  selector: 'app-search-rooms',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-rooms.component.html',
  styleUrl: './search-rooms.component.css'
})
export class SearchRoomsComponent {
  capacity!: number;
  checkInDate!: string;
  checkOutDate!: string;
  searchParameters: any[] = [];
  roomLists: any[] = [];
  selectedRooms: { roomId: string, checkInDate: string, checkOutDate: string }[] = [];

  constructor(private http: HttpClient) { }

  addSearchParameter() {
    this.searchParameters.push({
      capacity: this.capacity,
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate
    });
    this.capacity = 0;
    this.checkInDate = '';
    this.checkOutDate = '';
  }

  selectRoom(roomId: string, checkInDate: string, checkOutDate: string) {
    this.selectedRooms.push({ roomId, checkInDate, checkOutDate });
  }

  searchRooms() {
    this.roomLists = [];
    this.searchParameters.forEach(params => {
      this.http.post<any>('https://localhost:7006/Room/SearchRooms', [params])
        .subscribe({
          next: (response) => {
            console.log('Response from server:', response);
            this.roomLists.push(response);
          },
          error: (error) => {
            console.error('Error searching rooms:', error);
          }
        });
    });
  }

  createReservation() {
    const reservationRooms = this.selectedRooms.map(room => ({
      roomId: room.roomId, 
      checkInDate: room.checkInDate,
      checkOutDate: room.checkOutDate
    }));

    const reservationDTO = {
      reservationDate: new Date(),
      reservationStatus: 'Confirmed', 
      reservationRooms: reservationRooms
    };

    this.http.post<any>('https://localhost:7006/api/Reservation', reservationDTO)
      .subscribe({
        next: (response) => {
          console.log('Reservation created successfully:', response);
          this.searchParameters = [];
          this.roomLists = [];
          this.selectedRooms = [];
        },
        error: (error) => {
          console.error('Error creating reservation:', error);
          console.log(reservationDTO);
        }
      });
  }
}
