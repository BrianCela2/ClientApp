import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-room-reservations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-reservations.component.html',
  styleUrls: ['./room-reservations.component.css']
})
export class RoomReservationsComponent implements OnInit {
  roomReservations: any[] = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    const endDate = new Date();
    this.getRoomReservations(startDate, endDate);
  }

  getRoomReservations(startDate: Date, endDate: Date): void {
    this.dashboardService.getRoomReservations(startDate, endDate).subscribe(
      (reservations: any[]) => {
        this.roomReservations = reservations;
      },
      (error) => {
        console.log('Error fetching room reservations:', error);
      }
    );
  }
}

