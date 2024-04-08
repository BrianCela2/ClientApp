import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { CreateRoomDTO,UpdateRoomDTO } from '../shared/room.model';
@Injectable({
  providedIn: 'root'
})
export class RoomPhotosService {
}