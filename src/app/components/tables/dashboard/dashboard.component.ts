import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { UserRoleService } from '../../../services/user-role.service';
import { Router } from '@angular/router';
import { PaginationComponent } from '../../tablePagination/pagination/pagination.component';
import { SearchComponent } from '../../tablePagination/search/search.component';
import { SortingComponent } from '../../tablePagination/sorting/sorting.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone:true,
  imports:[PaginationComponent,SearchComponent,SortingComponent,CommonModule]
})
export class DashboardComponent implements OnInit {
  public users: any = [];
  public role!: string;

  public fullName: string = "";
  public currentPage: number = 1;
  public pageSize: number = 10;
  public sortField: string = "FirstName";
  public sortOrder: string = "asc";
  public searchString: string = "";

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private userRoleService: UserRoleService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fetchUsers();
    this.fetchUserRole();
  }

  fetchUsers() {
    this.userService.getUsers(this.currentPage, this.pageSize, this.sortField, this.sortOrder, this.searchString)
      .subscribe(res => {
        console.log(res)
        this.users = res;
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
  logout() {
    this.authService.signOut();
    this.router.navigateByUrl("/login");
  }
}
