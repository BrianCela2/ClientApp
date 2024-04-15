import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchParameters: any[] = [];
  reservation:any = {};

  constructor() { }

  setSearchParameters(params: any[]) {
    this.searchParameters = params;
  }

  getSearchParameters(): any[] {
    return this.searchParameters;
  }

  
  setReservation(params: any) {
    this.reservation = params;
  }

  getReservation(): any {
    return this.reservation;
  }
}
