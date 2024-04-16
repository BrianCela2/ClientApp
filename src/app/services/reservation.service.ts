import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl: string = 'https://localhost:7006/api/Reservation/';
  constructor(private http: HttpClient) {}

  GetReservationPrice(request: any) {
    return this.http.post<any>(`${this.baseUrl}GetReservationPrice`, request);
  }
}
