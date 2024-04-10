import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RoomPhotosService {
  private url = 'https://localhost:7006/RoomPhoto'; 

  constructor(private httpClient: HttpClient) { }
  deletePhoto(id: string): Observable<number> {
    return this.httpClient.delete<number>(`${this.url}/${id}`)
      .pipe(
        catchError(() => {
          const error = new Error('Error deleting photo');
          console.error(error);
          return throwError(() => error);
        })
      );
  }
  
  addPhotoToRoom(formData: FormData, roomId: string): Observable<any> {
    return this.httpClient.post(this.url, formData);
  }
}