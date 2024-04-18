import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HotelServicesService {

  private baseUrl: string = 'https://localhost:7006/api/';
  constructor(private http: HttpClient) {}

  getHotelServices() {
    return this.http.get<any>(`${this.baseUrl}hotelservices`);
  } 
  
  getServiceById(id:string){
    return this.http.get<any>(`${this.baseUrl}hotelservices/${id}`);
  }
  getServicesReservation(id:string) {
    return this.http.get<any[]>(`${this.baseUrl}hotelservices/ServicesOfReservation/${id}`);
  }
}
