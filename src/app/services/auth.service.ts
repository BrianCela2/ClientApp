import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Login, Register } from '../shared/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'https://localhost:7006/api/Auth/';
  private userPayload:any;
  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodeToken();
  }

  signUp(request: Register) {
    return this.http.post<any>(`${this.baseUrl}register`, request);
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  login(request: Login) {
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
      return jwtHelper.decodeToken(token);
    } else {
      return null;
    }
  }

  refreshToken(): Observable<string> {
    const expiredToken = localStorage.getItem('token');
    return this.http.post<string>(`${this.baseUrl}refresh-token`, expiredToken);
}

  getUserIdFromToken(){
    this.userPayload = this.decodeToken();
    if(this.userPayload){
      return this.userPayload.nameid
    }
  }

  getRoleFromToken(){
    this.userPayload = this.decodeToken();
    if(this.userPayload){
      return this.userPayload.role
    }
  }

  isAdmin(){
    const role= this.getRoleFromToken()
    if(role?.includes('Admin') || role?.includes('Operator')){
      return true
    }
    return false;
  }
}
