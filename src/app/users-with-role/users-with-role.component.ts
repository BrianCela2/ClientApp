import { Component } from '@angular/core';

@Component({
  selector: 'app-users-with-role',
  standalone: true,
  imports: [],
  templateUrl: './users-with-role.component.html',
  styleUrl: './users-with-role.component.css'
})
export class UsersWithRoleComponent {
  roleUsersCount !: Number;
}
