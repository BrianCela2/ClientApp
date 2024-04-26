import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { CreateRoomDTO,RoomDTO,UpdateRoomDTO } from '../shared/room.model';
@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private url = 'https://localhost:7006/Room'; 
  constructor(private httpClient: HttpClient) { }

  getRoomsByCategory(): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/GetAll`);
  }
  getRooms(page: number, pageSize: number, sortField: string, sortOrder: string): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/GetRoomPhotos?page=${page}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`);
  }
  getRoomsReservation(id:string) {
    return this.httpClient.get<any[]>('https://localhost:7006/api/ReservationRoom/GetRoomsReservation/'+id);
  }
  createRoom(formData: FormData): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/AddRoom`, formData);
  }
  updateRoom(id: string, updateRoomDto: UpdateRoomDTO): Observable<any> {
    return this.httpClient.put(`${this.url}/UpdateRoom/${id}`, updateRoomDto);
  }
  getRoomById(id: string): Observable<RoomDTO> {
    return this.httpClient.get<RoomDTO>(this.url+'/GetRoom/'+id);
  }
  getRoomWithId(id: string): Observable<RoomDTO> {
    return this.httpClient.get<RoomDTO>(this.url+'/GetById/'+id);
  }
  RoomDelete (id:string):Observable<number>{
    return this.httpClient.delete<number>(this.url+"/DeleteRoom/"+id);
  }
  updateRoomStatus(id: string, status: number): Observable<any> {
    return this.httpClient.put(`${this.url}/UpdateStatus/${id}?status=${status}`, {});
  }
  
}
