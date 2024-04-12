import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  public setRole(role: any) {
    this.role.next(role);
  }

  addRoleToUser(request: any) {
    return this.http.post<any>(`${this.baseUrl}UserRole`, request);
  }
  getUserRoles() {
    return this.http.get<any>(`${this.baseUrl}UserRole/getUserRoles`);
  }
  removeRoleFromUser(userId: string, role: number) {
    return this.http.delete<any>(`${this.baseUrl}UserRole/${userId}/${role}`);
  }
}
