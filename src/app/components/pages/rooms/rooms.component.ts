import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../../services/room.service';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../tablePagination/pagination/pagination.component';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule,PaginationComponent],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent implements OnInit {
  rooms: any[] = [];

 constructor(private roomService: RoomService){}
  ngOnInit(): void {
    this.fetchRooms()
  }
  fetchRooms() {
   this.roomService.getRoomsByCategory().subscribe(data => {
     this.rooms = data?.map((room: any) => ({ ...room, activePhotoIndex: 0 }));
   });
 }
  setActivePhoto(room: any, photoIndex: number) {
    room.activePhotoIndex = photoIndex;
  }
}
