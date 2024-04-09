import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { CreateRoomDTO,UpdateRoomDTO } from '../shared/room.model';
@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private url = 'https://localhost:7006/Room'; 
  constructor(private httpClient: HttpClient) { }

  getRooms(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url+'/GetRoomPhotos');
  }
  
  createRoom(room: CreateRoomDTO): Observable<any> {
    const formData = new FormData();
    formData.append('roomNumber', room.roomNumber.toString());
    formData.append('capacity', room.capacity ? room.capacity.toString() : '');
    formData.append('price', room.price.toString());
    formData.append('roomStatus', room.roomStatus ? room.roomStatus.toString() : '');
    formData.append('category', room.category ? room.category.toString() : '');
    if (room.photos) {
      for (let i = 0; i < room.photos.length; i++) {
        formData.append('photos', room.photos[i]);
      }
    }
    return this.httpClient.post<any>(this.url+'/AddRoom', formData);
  }
 
  updateRoom(id: string, updateRoomDto: UpdateRoomDTO): Observable<any> {
    const formData = new FormData();
    formData.append('roomId', id);
    formData.append('roomNumber', updateRoomDto.roomNumber.toString());
    formData.append('capacity', updateRoomDto.capacity ? updateRoomDto.capacity.toString() : '');
    formData.append('price', updateRoomDto.price.toString());
    formData.append('roomStatus', updateRoomDto.roomStatus ? updateRoomDto.roomStatus.toString() : '');
    formData.append('category', updateRoomDto.category ? updateRoomDto.category.toString() : '');
    
    return this.httpClient.put(this.url+'/UpdateRoom/'+id, formData);
  }
  getRoomById(id: string): Observable<any> {
    return this.httpClient.get<any>(this.url+'/GetRoom/'+id);
  }
  RoomDelete (id:string):Observable<number>{
    let httpheaders=new HttpHeaders()
    .set('Content-type','application/Json');
    let options={
      headers:httpheaders
    };
    return this.httpClient.delete<number>(this.url+"/DeleteRoom/"+id);
  }
}
