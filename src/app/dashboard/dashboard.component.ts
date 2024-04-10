import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ActiveUsersComponent } from '../active-users/active-users.component';
import { AvailableRoomsComponent } from '../available-rooms/available-rooms.component';
import { RoomOccupancyComponent } from '../room-occupancy/room-occupancy.component';
import { RoomReservationsComponent } from '../room-reservations/room-reservations.component';
import { ServiceUsageComponent } from '../service-usage/service-usage.component';
import { StaysCountComponent } from '../stays-count/stays-count.component';
import { TotalRevenueComponent } from '../total-revenue/total-revenue.component';
import { UsersWithRoleComponent } from '../users-with-role/users-with-role.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ActiveUsersComponent, AvailableRoomsComponent, RoomOccupancyComponent, RoomReservationsComponent, ServiceUsageComponent, StaysCountComponent, TotalRevenueComponent, UsersWithRoleComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  serviceUsageCount: number = 0;
  staysCount: number = 0;
  totalRevenue: number = 0;
  roomOccupancy: number = 0;
  roomReservations: any[] = [];
  availableRoomsCount: number = 0;
  activeUsersCount: number = 0;
  usersWithRoleCount: number = 0;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  fetchDashboardData(): void {
    // Fetch service usage count
    this.dashboardService.getServiceUsageCount().subscribe((count: number) => this.serviceUsageCount = count);

    // Fetch stays count for the last month
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    const endDate = new Date();
    this.dashboardService.getStaysCount(startDate, endDate).subscribe((count: number) => this.staysCount = count);

    // Fetch total revenue for the last month
    this.dashboardService.getTotalRevenue(startDate, endDate).subscribe((revenue: number) => this.totalRevenue = revenue);

    // Fetch room occupancy
    const roomId = 'roomId';
    this.dashboardService.getRoomOccupancy(startDate, endDate, roomId).subscribe((occupancy: number) => this.roomOccupancy = occupancy);

    // Fetch room reservations
    this.dashboardService.getRoomReservations(startDate, endDate).subscribe((reservations: any[]) => this.roomReservations = reservations);

    // Fetch available rooms count
    this.dashboardService.getAvailableRoomsCount().subscribe((count: number) => this.availableRoomsCount = count);

    // Fetch active users count
    this.dashboardService.getActiveUsersCount().subscribe((count: number) => this.activeUsersCount = count);

    // Fetch users with specific role count
    const role = 1;
    this.dashboardService.getUsersWithRoleCount(role).subscribe((count: number) => this.usersWithRoleCount = count);
  }
}
