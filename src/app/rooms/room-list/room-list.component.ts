import { Component, Input, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SortingComponent } from '../../components/tablePagination/sorting/sorting.component';
import { PaginationComponent } from '../../components/tablePagination/pagination/pagination.component';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [CommonModule,RouterLink,SortingComponent,PaginationComponent],
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
   rooms: any[] = [];
   public currentPage: number = 1;
   public pageSize: number = 10;
   public sortField: string = "Capacity";
   public sortOrder: string = "asc";
   public totalPages!:number ;
   sortOptions: { value: string, label: string }[] = [
     { value: 'Capacity', label: 'Capacity' },
     { value: 'RoomNumber', label: 'Room Number' },
     { value: 'Price', label: 'Price' },
     { value: 'Category', label: 'Category' },
   ];
   constructor(private roomService: RoomService, private router: Router) {}

   ngOnInit(): void {
     this.fetchRooms()
   }
   fetchRooms() {
    this.roomService.getRooms(this.currentPage, this.pageSize, this.sortField, this.sortOrder).subscribe(data => {
      this.rooms = data.rooms.map((room: any) => ({ ...room, activePhotoIndex: 0 }));
      this.totalPages =data.totalPages;
    });
  }

 
   setActivePhoto(room: any, photoIndex: number) {
     room.activePhotoIndex = photoIndex;
   }
 
   navigateToGet(roomId: number) {
     this.router.navigate(['Room/Get', roomId]);
   }
 
   confirmStatusUpdate(roomId: string, status: number): void {
     if (window.confirm('Are you sure you want to change Status of Room?')) {
       this.statusUpdate(roomId, status);
     }
   }
 
   statusUpdate(roomId: string, status: number) {
     this.roomService.updateRoomStatus(roomId, status).subscribe({
       next: (response) => {
         console.log('Room updated successfully');
       },
       error: (error) => {
         console.error('Error updating room:', error);
       }
     });
   }

   onPageChange(page: number) {
    this.currentPage = page;
    this.fetchRooms();
  }

  onSortChange(sort: { field: string, order: string }) {
    this.sortField = sort.field;
    this.sortOrder = sort.order;
    this.fetchRooms();
  }
 }
 
 