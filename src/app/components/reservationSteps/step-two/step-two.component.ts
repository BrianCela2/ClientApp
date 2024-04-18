import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchService } from '../../../services/search-service.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'step-two',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.css',
})
export class StepTwoComponent implements OnInit {
  constructor(private searchService: SearchService, private http: HttpClient) {}
  @Output() onStepCompleted = new EventEmitter();
  selectedRooms: {
    roomId: string;
    checkInDate: string;
    checkOutDate: string;
  }[] = [];
  roomLists: any[][] = [];
  searchParameters = this.searchService.getSearchParameters();

  ngOnInit(): void {
    this.roomLists = [];
    
      this.http
        .post<any>('https://localhost:7006/Room/SearchRooms', this.searchParameters)
        .subscribe({
          next: (response) => {
            this.roomLists = response;
            console.log('roomList', this.roomLists);
          },
          error: (error) => {
            console.error('Error searching rooms:', error);
          },
        });
  }

  selectRoom(roomId: string, checkInDate: string, checkOutDate: string) {
    // Remove previously selected room for the same search parameter
    this.selectedRooms = this.selectedRooms.filter(room => room.checkInDate !== checkInDate && room.checkOutDate !== checkOutDate);
    // Add newly selected room
    this.selectedRooms.push({ roomId, checkInDate, checkOutDate });
    this.onStepCompleted.emit();
  }

  createReservation() {
    const reservationRooms = this.selectedRooms.map((room) => ({
      roomId: room.roomId,
      checkInDate: room.checkInDate,
      checkOutDate: room.checkOutDate,
    }));

    this.searchService.setReservation ({
      reservationDate: new Date(),
      reservationStatus: 'Confirmed',
      reservationRooms: reservationRooms,
    });
  }
}
