import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoomService } from '../../services/room.service';
import { CreateRoomDTO } from '../../shared/room.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-room',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-room.component.html',
  styleUrl: './create-room.component.css'
})

export class CreateRoomComponent implements OnInit {
  rooms: any[] = [];
  newRoom: any = {}; 
  room: CreateRoomDTO = { roomNumber: 0, capacity: 0, price: 0,  photos: [] };
  private roomsSubscription: Subscription | undefined;

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    this.roomsSubscription = this.roomService.getRooms().subscribe({
      next: (data: any) => {
        this.rooms = data;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  onSubmit() {
    console.log('Room data:', this.room); 
    this.roomService.createRoom(this.room).subscribe({
      next: (response: any) => {
        console.log('Room created successfully:', response);
      },
      error: (error: any) => {
        console.error('Error creating room:', error);
      }
    });
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

