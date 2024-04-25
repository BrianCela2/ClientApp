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
import { PaginationComponent } from '../../tablePagination/pagination/pagination.component';
import { SortingComponent } from '../../tablePagination/sorting/sorting.component';
import { SearchComponent } from '../../tablePagination/search/search.component';

@Component({
  selector: 'app-user-roles',
  standalone: true,
  templateUrl: './user-roles.component.html',
  styleUrl: './user-roles.component.css',
  imports: [CommonModule, FormsModule,PaginationComponent,SortingComponent,SearchComponent],
})
export class UserRolesComponent implements OnInit {
  public userRoles:any;
  public activeUserRole: any = null;
  public newUserRole: NewUserRole={userId:""};
  public totalPages!:number ;
  public currentPage: number = 1;
  public pageSize: number = 10;
  public sortField: string = "FirstName";
  public sortOrder: string = "asc";
  public searchString: string = "";
  sortOptions: { value: string, label: string }[] = [
    { value: 'FirstName', label: 'First Name' },
    { value: 'LastName', label: 'Last Name' }
  ];
  public get userRoleEnum(): typeof Roles {
    return Roles;
  }

  constructor(private userRoleService: UserRoleService,private _toasterService: PopupService) {}

  ngOnInit() {
    this.getUserRoles();
  }

  toggleInput(userRole: UserRoleDetail) {
    this.activeUserRole = this.activeUserRole === userRole ? null : userRole;
  }
  getUserRoles() {
    this.userRoleService.getUserRoleDetails(this.currentPage, this.pageSize, this.sortField, this.sortOrder, this.searchString).subscribe((res: any) => {
      console.log('res',res)
      this.userRoles = res.users;
      this.totalPages =res.totalPages;
    });
  }
  addRoleToUser(userId: string, role: Roles) {
    this.userRoleService.addRoleToUser(userId, role).subscribe(
      (response) => {
        this._toasterService.success('Role added successfully');
        this.getUserRoles();
        this.activeUserRole = null;
      },
      (error: HttpErrorResponse) => {
        const errorMessage = error.error?.message || 'User already has this role';
        this._toasterService.warning(errorMessage);
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
  onPageChange(page: number) {
    this.currentPage = page;
    this.getUserRoles();
  }

  onSortChange(sort: { field: string, order: string }) {
    this.sortField = sort.field;
    this.sortOrder = sort.order;
    this.getUserRoles();
  }

  onSearchChange(searchString: string) {
    this.searchString = searchString;
    this.getUserRoles();
  }

}
