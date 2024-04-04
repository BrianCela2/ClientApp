import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RoomService {
private url = 'https://localhost:7006/Room/GetAll';
  constructor(private httpClient:HttpClient) { }

  getRooms(){
    return this.httpClient.get(this.url);
  }
}
