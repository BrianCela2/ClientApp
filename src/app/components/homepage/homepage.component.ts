import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SearchService } from '../../services/search-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent implements OnInit {
  constructor(
    private router: Router,
    private searchService: SearchService,
    private roomService: RoomService
  ) {}
  checkInDate!: string;
  checkOutDate!: string;
  capacity!: number;
  rooms!: number;
  roomsService: any[] = [];

  ngOnInit(): void {
    this.fetchRooms();
  }
  setActivePhoto(room: any, photoIndex: number) {
    room.activePhotoIndex = photoIndex;
  }
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  onSubmit() {
    const searchParameters = [];

    for (let i = 0; i < this.rooms; i++) {
      searchParameters.push({
        checkInDate: this.checkInDate,
        checkOutDate: this.checkOutDate,
        capacity: this.capacity,
      });
    }

    this.searchService.setSearchParameters(searchParameters);

    this.router.navigateByUrl('/createReservation');
  }
  fetchRooms() {
    this.roomService.getRoomsByCategory().subscribe((data) => {
      this.roomsService = data?.map((room: any) => ({
        ...room,
        activePhotoIndex: 0,
      }));
    });
  }
}
