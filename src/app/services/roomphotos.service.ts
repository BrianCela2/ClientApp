import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RoomPhotosService {
  private url = 'https://localhost:7006/RoomPhoto'; 

  constructor(private httpClient: HttpClient) { }
  DeletePhoto(id:string):Observable<any>{
    return this.httpClient.delete<any>(this.url+"/"+id);

  }
}