import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { User } from '../shared/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = 'https://localhost:7006/User/';
  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsers(
    page: number,
    pageSize: number,
    sortField: string,
    sortOrder: string,
    searchString: string
  ): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}getAllUsers?page=${page}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}&searchString=${searchString}`
    );
  }

  updateUser(request: any) {
    return this.http.put<any>(`${this.baseUrl}`, request);
  }

  getActualUserById() {
    const userId = this.authService.getUserIdFromToken();
    console.log(userId)
    return this.http.get<User>(`${this.baseUrl}${userId}`);
  }

}
