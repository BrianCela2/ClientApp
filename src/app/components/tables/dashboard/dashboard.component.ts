import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { UserRoleService } from '../../../services/user-role.service';
import { Router } from '@angular/router';
import { PaginationComponent } from '../../tablePagination/pagination/pagination.component';
import { SearchComponent } from '../../tablePagination/search/search.component';
import { SortingComponent } from '../../tablePagination/sorting/sorting.component';
import { CommonModule } from '@angular/common';
import { Roles } from '../../../shared/userRole.model';
import { PopupService } from '../../../services/popup.service';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone:true,
  imports:[PaginationComponent,SearchComponent,SortingComponent,CommonModule, FormsModule]
})
export class DashboardComponent implements OnInit {
  public users: any = [];
  public role!: string;
  public totalPages!:number ;
  public fullName: string = "";
  public currentPage: number = 1;
  public pageSize: number = 10;
  public sortField: string = "FirstName";
  public sortOrder: string = "asc";
  public searchString: string = "";
  sortOptions: { value: string, label: string }[] = [
    { value: 'FirstName', label: 'First Name' },
    { value: 'LastName', label: 'Last Name' }
  ];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private userRoleService: UserRoleService,
    private _toasterService: PopupService
  ) { }

  ngOnInit() {
    this.fetchUsers();
    this.fetchUserRole();
  }

  fetchUsers() {
    this.userService.getUsers(this.currentPage, this.pageSize, this.sortField, this.sortOrder, this.searchString)
      .subscribe(res => {
        console.log(res)
        this.users = res.users;
        this.totalPages =res.totalPages;
      });
  }

  fetchUserRole() {
    this.userRoleService.getRole()
      .subscribe(val => {
        const roleFromToken = this.authService.getRoleFromToken();
        this.role = val || roleFromToken;
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchUsers();
  }

  onSortChange(sort: { field: string, order: string }) {
    this.sortField = sort.field;
    this.sortOrder = sort.order;
    this.fetchUsers();
  }

  onSearchChange(searchString: string) {
    this.searchString = searchString;
    this.fetchUsers();
  }

  addRoleToUser(userId: string, role: Roles) {
    console.log(userId,role)
    if (!role) {
      this._toasterService.success('Role cannot be empty');
      return;
    }

    this.userRoleService.addRoleToUser(userId, role).subscribe(
      (response) => {
        this._toasterService.success('Role added successfully');
      },
      (error: HttpErrorResponse) => {
        const errorMessage = error.error?.message || 'Something went wrong';
        this._toasterService.danger(errorMessage);
      }

    );
  }
}
