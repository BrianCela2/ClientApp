import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Roles, UserRoleDetail } from '../shared/userRole.model';

@Injectable({
  providedIn: 'root',
})
export class UserRoleService {
  private role = new BehaviorSubject<any>('');
  private baseUrl: string = 'https://localhost:7006/api/';
  

  constructor(private http: HttpClient) {}

  public getRole() {
    console.log(this.role);
    return this.role.asObservable();
  }

  public setRole(role: Roles) {
    this.role.next(role);
  }

  getUserRoleDetails(
    page: number,
    pageSize: number,
    sortField: string,
    sortOrder: string,
    searchString: string) {
    return this.http.get<any>(
      `${this.baseUrl}UserRole/getUserRoleDetails?page=${page}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}&searchString=${searchString}`
    );
  }

  addRoleToUser(userId: string, role: Roles) {
    return this.http.post<any>(`${this.baseUrl}UserRole`, {
      userId: userId,
      roles: role,
    });
  }

  removeRoleFromUser(userId: string, role: Roles) {
    return this.http.delete<any>(
      `${this.baseUrl}UserRole/delete?userId=${userId}&roles=${role}`
    );
  }
}
