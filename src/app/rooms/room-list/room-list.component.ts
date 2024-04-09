import { Component, OnInit } from '@angular/core';
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
    });
  }

  setActivePhoto(roomIndex: number, photoIndex: number) {
    this.rooms[roomIndex].activePhotoIndex = photoIndex;
  }
  navigateToGet(roomId: number) {
    this.router.navigate(['Room/Get', roomId]);
  }
}
