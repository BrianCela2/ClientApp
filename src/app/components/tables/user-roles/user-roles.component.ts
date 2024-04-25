import { Component, OnInit } from '@angular/core';
import { UserRoleService } from '../../../services/user-role.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NewUserRole,
  Roles,
  UserRoleDetail,
} from '../../../shared/userRole.model';
import { PopupService } from '../../../services/popup.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-roles',
  standalone: true,
  templateUrl: './user-roles.component.html',
  styleUrl: './user-roles.component.css',
  imports: [CommonModule, FormsModule],
})
export class UserRolesComponent implements OnInit {
  public userRoles: UserRoleDetail[] = [];
  public activeUserRole: any = null;
  public newUserRole: NewUserRole={userId:""};

  constructor(private userRoleService: UserRoleService,private _toasterService: PopupService) {}

  ngOnInit() {
    this.getUserRoles();
  }

  toggleInput(userRole: UserRoleDetail) {
    this.activeUserRole = this.activeUserRole === userRole ? null : userRole;
  }
  getUserRoles() {
    this.userRoleService.getUserRoleDetails().subscribe((res: any) => {
      this.userRoles = res;
    });
  }
  addRole(userRole: UserRoleDetail) {
    const userId = userRole.userId;
    const role = userRole.newRoles;
    this.userRoleService.addRoleToUser(userId, role!).subscribe(
      (response) => {
        this._toasterService.success('Role added successfully');
        this.getUserRoles();
      },
      (error: HttpErrorResponse) => {
        const errorMessage = error.error?.message || 'Something went wrong';
        this._toasterService.danger(errorMessage);
      }

    );
  }

  removeRole(userRole: UserRoleDetail) {
    const userId = userRole.userId;
    const role = userRole.roles;
    this.userRoleService.removeRoleFromUser(userId, role).subscribe((res) => {
      this.getUserRoles();
    });
  }
}
