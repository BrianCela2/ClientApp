import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-available-rooms',
  standalone: true,
  imports: [],
  templateUrl: './available-rooms.component.html',
  styleUrls: ['./available-rooms.component.css']
})

export class AvailableRoomsComponent implements OnInit {
  availableRoomsCount: number = 0;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.fetchAvailableRoomsCount();
  }

  fetchAvailableRoomsCount() {
    this.dashboardService.getAvailableRoomsCount().subscribe(
      (data) => {
        this.availableRoomsCount = data;
      },
      (error) => {
        console.log('Error fetching available rooms count:', error);
      }
    );
  }
}
