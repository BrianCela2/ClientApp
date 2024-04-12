import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-service-usage',
  standalone: true,
  imports: [],
  templateUrl: './service-usage.component.html',
  styleUrls: ['./service-usage.component.css']
})
export class ServiceUsageComponent implements OnInit {
  serviceUsageCount: number = 0;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.fetchServiceUsageCount();
  }

  fetchServiceUsageCount() {
    this.dashboardService.getServiceUsageCount().subscribe(
      (data) => {
        this.serviceUsageCount = data;
      },
      (error) => {
        console.log('Error fetching service usage count:', error);
      }
    );
  }
}
