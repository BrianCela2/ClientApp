import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-active-users',
  standalone: true,
  imports: [],
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})

export class ActiveUsersComponent implements OnInit {
  activeUsersCount: number = 0;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.getActiveUsersCount();
  }

  getActiveUsersCount() {
    this.dashboardService.getActiveUsersCount().subscribe(
      (data) => {
        this.activeUsersCount = data;
      },
      (error) => {
        console.log('Error fetching active users count:', error);
      }
    );
  }
}
