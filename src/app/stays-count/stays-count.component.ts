import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-stays-count',
  standalone: true,
  templateUrl: './stays-count.component.html',
  styleUrls: ['./stays-count.component.css']
})

export class StaysCountComponent implements OnInit {
  staysCount!: number;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    const endDate = new Date();
    this.getStaysCount(startDate, endDate);
  }

  getStaysCount(startDate: Date, endDate: Date): void {
    this.dashboardService.getStaysCount(startDate, endDate).subscribe((count: number) => {
      this.staysCount = count;
    });
  }
}
