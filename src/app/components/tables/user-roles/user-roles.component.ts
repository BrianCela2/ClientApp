import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoleService } from '../../../services/user-role.service';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-roles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-roles.component.html',
  styleUrl: './user-roles.component.css',
})
export class UserRolesComponent implements OnInit {
  public userRoles: any = [];
  public firstName: string = '';
  public lastName: string = '';

  constructor(private user: UserService, private userRole: UserRoleService) {}

  ngOnInit() {
    this.userRole.getUserRoleDetails().subscribe((res) => {
      this.userRoles = res.result;
      console.log(this.userRoles);
    });
  }
}
