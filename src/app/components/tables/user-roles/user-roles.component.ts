import { Component, OnInit } from '@angular/core';
import { UserRoleService } from '../../../services/user-role.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserRoleDetail } from '../../../shared/userRole.model';

@Component({
  selector: 'app-user-roles',
  standalone: true,
  templateUrl: './user-roles.component.html',
  styleUrl: './user-roles.component.css',
  imports:[CommonModule,FormsModule]
})
export class UserRolesComponent implements OnInit {
  public userRoles: UserRoleDetail[] = [];
  public activeUserRole: any = null; 

  constructor(private userRoleService: UserRoleService) {}

  ngOnInit() {
    this.getUserRoles();
  }

  toggleInput(userRole: UserRoleDetail) {
    this.activeUserRole = this.activeUserRole === userRole ? null : userRole;
  }
  
  
  getUserRoles() {
    this.userRoleService.getUserRoleDetails().subscribe((res:any) => {
      this.userRoles = res;
      });
  }

  addRole(userRole: UserRoleDetail) {
    const userId = userRole.userId;
    const role = userRole.newRoles 
    this.userRoleService.addRoleToUser(userId, role!).subscribe((res) => {
      this.getUserRoles();
    });
  }

  removeRole(userRole: UserRoleDetail) {
    const userId = userRole.userId; 
    const role = userRole.roles; 
    this.userRoleService.removeRoleFromUser(userId, role).subscribe((res) => {
      this.getUserRoles();
    });
  }
}
