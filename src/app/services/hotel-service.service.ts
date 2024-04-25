import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HotelServiceService {
  // Base URL of the backend API
  baseUrl = 'https://localhost:7006/api/hotelservices';

  constructor(private http: HttpClient) { }

  // Fetches all hotel services from the backend
  getAllHotelServices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Fetches a specific hotel service by its ID
  getHotelServiceById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Adds a new hotel service to the backend
  addHotelService(serviceData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, serviceData)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Updates an existing hotel service with the provided ID
  updateHotelService(id: string, serviceData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, serviceData)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Deletes a hotel service with the provided ID
  deleteHotelService(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Private method to handle HTTP errors
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
