import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
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
  constructor() { }

  ngOnInit(): void {

  }
}
