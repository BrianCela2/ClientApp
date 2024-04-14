import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateNotificationDTO } from '../shared/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private url = 'https://localhost:7006/Notification';

  constructor(private httpClient: HttpClient) { }

  SendNotification(notification: CreateNotificationDTO): Observable<any> {
    return this.httpClient.post<any>(this.url + '/AddNotificationAllUsers', notification);
  }
  getNotifications(receiverId:string): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url+'/'+receiverId);
  }
}
