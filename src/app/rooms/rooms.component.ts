import { Component, OnInit } from '@angular/core';
import { RoomService } from './rooms.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent implements OnInit{
  rooms: any;
constructor(private roomsService:RoomService){}
ngOnInit(): void {
  this.roomsService.getRooms()
  .subscribe(response => {
    this.rooms = response;
  });
}
}
