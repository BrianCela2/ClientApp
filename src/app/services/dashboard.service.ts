// dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class DashboardService {

  constructor(private http: HttpClient) { }

  getServiceUsageCount(): Observable<number> {
    return this.http.get<number>('https://localhost:7006/api/Dashboard/service-usage');
  }

  getStaysCount(startDate: Date, endDate: Date): Observable<number> {
    return this.http.get<number>(`https://localhost:7006/api/Dashboard/stays-count?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
  }

  getTotalRevenue(startDate: Date, endDate: Date): Observable<number> {
    return this.http.get<number>(`https://localhost:7006/api/Dashboard/total-revenue?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
  }

  getRoomOccupancy(startDate: Date, endDate: Date, roomId: string): Observable<number> {
    return this.http.get<number>(`https://localhost:7006/api/Dashboard/room-occupancy?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&roomId=${roomId}`);
  }

  getRoomReservations(startDate: Date, endDate: Date): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7006/api/Dashboard/room-reservations?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
  }

  getAvailableRoomsCount(): Observable<number> {
    return this.http.get<number>('https://localhost:7006/api/Dashboard/available-rooms');
  }

  getActiveUsersCount(): Observable<number> {
    return this.http.get<number>('https://localhost:7006/api/Dashboard/active-users');
  }


  getUsersWithRoleCount(role: number): Observable<number> {
    return this.http.get<number>(`https://localhost:7006/api/Dashboard/role-users?role=${role}`);
  }

}

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class DashboardService {
//   private baseUrl = 'api/dashboard';

//   constructor(private http: HttpClient) { }

//   getServiceUsageCount(serviceId: string): Observable<number> {
//     return this.http.get<number>(`${this.baseUrl}/service-usage?serviceId=${serviceId}`);
//   }

//   getStaysCount(startDate: Date, endDate: Date): Observable<number> {
//     return this.http.get<number>(`${this.baseUrl}/stays-count?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
//   }

//   getTotalRevenue(startDate: Date, endDate: Date): Observable<number> {
//     return this.http.get<number>(`${this.baseUrl}/total-revenue?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
//   }

//   getRoomOccupancy(roomId: string, startDate: Date, endDate: Date): Observable<number> {
//     return this.http.get<number>(`${this.baseUrl}/room-occupancy?roomId=${roomId}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
//   }

//   getRoomReservations(startDate: Date, endDate: Date): Observable<any[]> {
//     return this.http.get<any[]>(`${this.baseUrl}/room-reservations?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
//   }

//   getAvailableRoomsCount(): Observable<number> {
//     return this.http.get<number>(`${this.baseUrl}/available-rooms`);
//   }

//   getActiveUsersCount(): Observable<number> {
//     return this.http.get<number>(`${this.baseUrl}/active-users`);
//   }

//   getUsersWithRoleCount(role: number): Observable<number> {
//     return this.http.get<number>(`${this.baseUrl}/role-users?role=${role}`);
//   }
// }
