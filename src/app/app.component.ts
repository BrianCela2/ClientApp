import { CommonModule } from '@angular/common';
import { Component,ChangeDetectorRef } from '@angular/core';
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
  notification: any[] = [];
  notifications: any[] = [];
  unreadCount: number = 0;
  private hubConnectionBuilder!: HubConnection;
  private destroy$: Subject<void> = new Subject<void>();
  userId:string;

  constructor(
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {
    this.userId = this.authService.getUserIdFromToken();
    const notification = { receiverId: this.userId, messageContent: "hey" };

  }

  ngOnInit(): void {
    console.log('Initializing SignalR connection...');
    this.hubConnectionBuilder = new HubConnectionBuilder()
      .withUrl('https://localhost:7006/Notify', {
        accessTokenFactory: () => this.authService.getToken() || ''
      })
      .configureLogging(LogLevel.Information)
      .build();

    
this.hubConnectionBuilder.start().then(() => {
  this.hubConnectionBuilder.invoke('ReceiveNotification', this.notification)
    .then(() => {})
    .catch(error => {
      console.error('Error invoking method to start receiving notifications:', error);
    });
})
.catch(err => {
  console.error('Error while connecting to SignalR:', err);
});

    this.hubConnectionBuilder.on('ReceiveNotificationAllUser', (result1: any,result2:any) => {
      this.addNotification(result1);
      this.unreadCount++;
      console.log(result1);
    });

    const receiverId = this.authService.getUserIdFromToken();
    this.notificationService.getNotifications(receiverId).subscribe(data => {
      this.notifications = data;
      this.unreadCount = this.notifications.filter(notification => !notification.isSeen).length;
      console.log(this.notifications);
    });
  }
  NotificationsToSeen(): void {
    this.notificationService.NotificationsAsSeen(this.userId).subscribe({
      next: () => {
        this.unreadCount=0;
              console.log('All notifications marked as seen');
      },
      error: (error) => {
        console.log(this.userId);
        console.error('Error marking notifications as seen:', error);
      }
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