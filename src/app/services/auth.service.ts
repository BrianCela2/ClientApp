import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'https://localhost:7006/api/Auth/';
  private userPayload:any;
  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodeToken();
  }

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

  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken();
    if (token) {
      console.log(jwtHelper.decodeToken(token));
      return jwtHelper.decodeToken(token);
    } else {
      return null;
    }
  }

  getUserIdFromToken(){
    if(this.userPayload){
      return this.userPayload.nameid
    }
  }

  getRoleFromToken(){
    if(this.userPayload){
      return this.userPayload.role
    }
  }
}
