import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserHistoryService {
  private url='https://localhost:7006/api/UserHistory';
  constructor(private httpClient:HttpClient) { }
getHistory():Observable<any>{
return this.httpClient.get<any[]>(this.url);
}
}
