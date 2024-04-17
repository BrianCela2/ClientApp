import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private url = 'https://localhost:7006/api/Reservation'; 
  constructor(private httpClient: HttpClient) { }

  
  GetReservationPrice(request: any) {
    return this.httpClient.post<any>(`${this.url}/GetReservationPrice`, request);
  }
  getReservations(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url+'/ReservationsServiceRooms');
  }
  getReservationById(id: string): Observable<any> {
    return this.httpClient.get<any>(this.url+'/'+id);
  }
  getReservationOfUser(): Observable<any> {
    return this.httpClient.get<any>(this.url+'/GetReservationForUser');
  }
  getReservationRooms(): Observable<any> {
    return this.httpClient.get<any>(this.url+'/GetReservationsWithRooms');
  }
  updateReservation(id: string, updateReservationDto: any): Observable<any> {
    updateReservationDto.reservationId=id;
    return this.httpClient.put(this.url + '/' + id, updateReservationDto);
  }
}


