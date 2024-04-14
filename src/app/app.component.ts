

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Subject, takeUntil, timer } from 'rxjs';
import { SendNotificationsComponent } from './notifications/send-notifications/send-notifications.component';
import { SearchRoomsComponent } from './rooms/search-rooms/search-rooms.component';
import { NotificationService } from './services/notification.service';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule,RouterLink,SendNotificationsComponent,SearchRoomsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  name = 'ClientApp';
  rooms: any;
  notification: any[] = [];
  receiverId!:string;
  notifications:any[]=[];
  private url = 'https://localhost:7006/Notification';
  private hubConnectionBuilder!: HubConnection;
  private destroy$: Subject<void> = new Subject<void>();
  unreadCount:number=0;
  constructor(private notificationService:NotificationService,private authService:AuthService){}
  
  ngOnInit(): void {
    console.log('Initializing SignalR connection...');
    this.hubConnectionBuilder = new HubConnectionBuilder()
      .withUrl('https://localhost:7006/Notify',{
        accessTokenFactory: () => this.authService.getToken() || ''})
      .configureLogging(LogLevel.Information)
      .build();
  
    this.hubConnectionBuilder
      .start()
      .then(() => console.log('Connection started.'))
      .catch(err => console.error('Error while connecting to SignalR:', err));

    this.hubConnectionBuilder.on('ReceiveNotification', (result: any) => {
      this.addNotification(result);
      console.log(result);
    });
    this.receiverId = this.authService.getUserIdFromToken();
    this.notificationService.getNotifications(this.receiverId).subscribe(data => {
      this.notifications = data;
      this.unreadCount = this.notifications.filter(notification => !notification.isSeen).length;

      console.log(this.notifications);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addNotification(notification: any): void {
    this.notification.unshift(notification);
    timer(5000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.removeNotification(notification);
      });
  }

  removeNotification(notification: any): void {
    const index = this.notification.indexOf(notification);
    if (index !== -1) {
      this.notification.splice(index, 1);
    }
  }


}