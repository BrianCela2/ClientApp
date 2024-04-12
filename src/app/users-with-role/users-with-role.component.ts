import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-users-with-role',
  standalone: true,
  imports: [],
  templateUrl: './users-with-role.component.html',
  styleUrls: ['./users-with-role.component.css']
})
export class UsersWithRoleComponent implements OnInit {
  roleUsersCount: number = 0;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    const role = 1; // Replace with the desired role ID
    this.getRoleUsersCount(role);
  }

  getRoleUsersCount(role: number) {
    this.dashboardService.getUsersWithRoleCount(role).subscribe(
      (data) => {
        this.roleUsersCount = data;
      },
      (error) => {
        console.log('Error fetching users with role count:', error);
      }
    );
  }
}
