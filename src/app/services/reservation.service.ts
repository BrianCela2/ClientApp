import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private url = 'https://localhost:7006/api/Reservation'; 
  constructor(private httpClient: HttpClient) { }
  getReservations(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url+'/ReservationsServiceRooms');
  }
  getReservationById(id: string): Observable<any> {
    return this.httpClient.get<any>(this.url+id);
  }
  getReservationOfUser(): Observable<any> {
    return this.httpClient.get<any>(this.url+'/GetReservationForUser');
  }
  getReservationRooms(): Observable<any> {
    return this.httpClient.get<any>(this.url+'/GetReservationsWithRooms');
  }
}
