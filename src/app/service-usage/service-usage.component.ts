// service-usage.component.ts

import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-service-usage',
  standalone: true,
  templateUrl: './service-usage.component.html',
  styleUrls: ['./service-usage.component.css']
})
export class ServiceUsageComponent implements OnInit {
  serviceUsageCount!: number;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getServiceUsageCount();
  }

  getServiceUsageCount(): void {
    this.dashboardService.getServiceUsageCount().subscribe((count: number) => {
      this.serviceUsageCount = count;
    });
  }

}
