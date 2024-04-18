import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation, ReservationSample, UpdateReservation } from '../shared/reservation.model';
import { ReservationRoom } from '../shared/reservationRooms.mode';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private url = 'https://localhost:7006/api/Reservation'; 
  constructor(private httpClient: HttpClient) { }

  
  GetReservationPrice(request: ReservationSample) {
    return this.httpClient.post<any>(`${this.url}/GetReservationPrice`, request);
  }
  getReservations(): Observable<Reservation[]> {
    return this.httpClient.get<any[]>(this.url+'/ReservationsServiceRooms');
  }
  getReservationById(id: string): Observable<Reservation> {
    return this.httpClient.get<any>(this.url+'/'+id);
  }
  getReservationOfUser(): Observable<any> {
    return this.httpClient.get<any>(this.url+'/GetReservationForUser');
  }
  getReservationRooms(): Observable<ReservationRoom[]> {
    return this.httpClient.get<any>(this.url+'/GetReservationsWithRooms');
  }
  updateReservation(id: string, updateReservationDto: UpdateReservation): Observable<any> {
    updateReservationDto.ReservationId=id;
    return this.httpClient.put(this.url + '/' + id, updateReservationDto);
  }
  updateReservationStatus(id:string):Observable<any>{
    return this.httpClient.put(`${this.url}/status/${id}`, {reservationId:id,reservationStatus:'canceled'});
  }
}


