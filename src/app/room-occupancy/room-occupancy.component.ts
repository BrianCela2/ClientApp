import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-room-occupancy',
  standalone: true,
  imports: [],
  templateUrl: './room-occupancy.component.html',
  styleUrls: ['./room-occupancy.component.css']
})
export class RoomOccupancyComponent implements OnInit {
  roomOccupancy: number = 0;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    const roomId = '1';
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    const endDate = new Date();
    this.getRoomOccupancy(roomId, startDate, endDate);
  }

  getRoomOccupancy(roomId: string, startDate: Date, endDate: Date): void {
    this.dashboardService.getRoomOccupancy(startDate, endDate, roomId).subscribe(
      (occupancy: number) => {
        this.roomOccupancy = occupancy;
      },
      (error) => {
        console.log('Error fetching room occupancy:', error);
      }
    );
  }
}
