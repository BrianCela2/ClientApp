import { Injectable } from '@angular/core';
import { Reservation, ReservationSample } from '../shared/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchParameters: any[] = [];
  reservation!:ReservationSample ;

  constructor() { }

  setSearchParameters(params: any[]) {
    this.searchParameters = params;
  }

  getSearchParameters(): any[] {
    return this.searchParameters;
  }

  
  setReservation(params: ReservationSample) {
    this.reservation = params;
  }

  getReservation(): ReservationSample {
    return this.reservation;
  }
}
