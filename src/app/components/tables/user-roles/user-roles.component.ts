import { Component, OnInit } from '@angular/core';
import { UserRoleService } from '../../../services/user-role.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-roles',
  standalone: true,
  templateUrl: './user-roles.component.html',
  styleUrl: './user-roles.component.css',
  imports:[CommonModule,FormsModule]
})
export class UserRolesComponent implements OnInit {
  public userRoles: any = [];
  public activeUserRole: any = null; 

  constructor(private userRoleService: UserRoleService) {}

  ngOnInit() {
    this.getUserRoles();
  }

  toggleInput(userRole: any) {
    this.activeUserRole = this.activeUserRole === userRole ? null : userRole;
  }
  
  
  getUserRoles() {
    this.userRoleService.getUserRoleDetails().subscribe((res) => {
      this.userRoles = res.result;
      });
  }

  addRole(userRole: any) {
    const userId = userRole.userId;
    const role = userRole.newRoles 
    this.userRoleService.addRoleToUser(userId, role).subscribe((res) => {
      this.getUserRoles();
    });
  }

  removeRole(userRole: any) {
    const userId = userRole.userId; 
    const role = userRole.roles; 
    this.userRoleService.removeRoleFromUser(userId, role).subscribe((res) => {
      this.getUserRoles();
    });
  }
}
