import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-total-revenue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './total-revenue.component.html',
  styleUrls: ['./total-revenue.component.css']
})
export class TotalRevenueComponent implements OnInit {
  totalRevenue: number = 0;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    const endDate = new Date();
    this.getTotalRevenue(startDate, endDate);
  }

  getTotalRevenue(startDate: Date, endDate: Date): void {
    this.dashboardService.getTotalRevenue(startDate, endDate).subscribe(
      (revenue: number) => {
        this.totalRevenue = revenue;
      },
      (error) => {
        console.log('Error fetching total revenue:', error);
      }
    );
  }
}
