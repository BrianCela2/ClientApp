import { Component, Input, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
   rooms: any[] = [];

  constructor(private roomService: RoomService,private router:Router){}

  ngOnInit(): void {
    this.roomService.getRooms().subscribe(data => {
      this.rooms = data;
      this.rooms.forEach(room => {
        room.activePhotoIndex = 0; 
      });
      console.log(this.rooms);
    });
  }

  setActivePhoto(roomIndex: number, photoIndex: number) {
    this.rooms[roomIndex].activePhotoIndex = photoIndex;
  }
  navigateToGet(roomId: number) {
    this.router.navigate(['Room/Get', roomId]);
  }
  confirmStatusUpdate(roomId: string,status:number): void {
    if (window.confirm('Are you sure you want to change Status of Room?')) {
      this.statusUpdate(roomId,status);
    }
  }
  statusUpdate(roomId:string,status:number){
    this.roomService.updateRoomStatus(roomId,status).subscribe({
      next: (response) => {
        console.log('Room updated successfully');
      },
      error: (error) => {
        console.error('Error updating room:', error);
      },
      complete: () => {
      }
    });
  }
}

