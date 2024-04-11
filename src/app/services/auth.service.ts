import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'https://localhost:7006/api/Auth/';
  constructor(private http: HttpClient, private router: Router) {}

  signUp(request: any) {
    return this.http.post<any>(`${this.baseUrl}register`, request);
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  login(request: any) {
    return this.http.post<any>(`${this.baseUrl}login`, request, {
      responseType: 'text' as 'json',
    });
  }
  storeToken(tokenVaule: string) {
    localStorage.setItem('token', tokenVaule);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
