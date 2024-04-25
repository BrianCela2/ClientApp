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
  public currentPage: number = 1;
  public pageSize: number = 10;
  rooms: any[] = [];
  public totalPages!:number ;

 constructor(private roomService: RoomService){}
  ngOnInit(): void {
    this.fetchRooms()
  }
  fetchRooms() {
   this.roomService.getRoomsByCategory(this.currentPage, this.pageSize).subscribe(data => {
     this.rooms = data.rooms.map((room: any) => ({ ...room, activePhotoIndex: 0 }));
     this.totalPages =data.totalPages;
   });
 }
  setActivePhoto(room: any, photoIndex: number) {
    room.activePhotoIndex = photoIndex;
  }
  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchRooms();
  }
}
