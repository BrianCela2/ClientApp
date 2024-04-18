import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateNotificationDTO, NotificationDTO } from '../shared/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private url = 'https://localhost:7006/Notification';

  constructor(private httpClient: HttpClient) { }

  SendNotification(notification: CreateNotificationDTO): Observable<CreateNotificationDTO> {
    return this.httpClient.post<CreateNotificationDTO>(this.url + '/AddNotificationAllUsers', notification);
  }
  getNotifications(receiverId:string): Observable<NotificationDTO[]> {
    return this.httpClient.get<NotificationDTO[]>(this.url+'/'+receiverId);
  }
  NotificationsAsSeen(userId: string): Observable<any> {
    const url = `${this.url}/NotificationsSeen/${userId}`;
    return this.httpClient.put<any>(url, {});
}
}
