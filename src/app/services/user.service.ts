import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = 'https://localhost:7006/User/';
  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsers() {
    return this.http.get<any>(`${this.baseUrl}getAllUsers`);
  }

  updateUser(request: any) {
    return this.http.put<any>(`${this.baseUrl}`, request);
  }

  getActualUserById() {
    const userId = this.authService.getUserIdFromToken(); // Get user id from token
    if (userId) {
      return this.http.get<any>(`${this.baseUrl}userId/${userId}`);
    } else {
      console.error('User id not found in token');
      return null;
    }
  }
}
