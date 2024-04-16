import { CommonModule } from '@angular/common';
import { Component,ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil, timer } from 'rxjs';
import { SendNotificationsComponent } from './notifications/send-notifications/send-notifications.component';
import { SearchRoomsComponent } from './rooms/search-rooms/search-rooms.component';
import { NotificationService } from './services/notification.service';
import { AuthService } from './services/auth.service';
import { SignalRService } from './services/signal-rservice.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule,RouterLink,SendNotificationsComponent,SearchRoomsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
  export class AppComponent implements OnInit, OnDestroy {
    name = 'ClientApp';
    notification: any[] = [];
    notifications: any[] = [];
    unreadCount: number = 0;
    userId: string;
    connectionId!: string;
    private destroy$: Subject<void> = new Subject<void>();
  
    constructor(
      private cdr: ChangeDetectorRef,
      private signalRService: SignalRService,
      private authService: AuthService,
      private notificationService: NotificationService
    ) {
      this.userId = this.authService.getUserIdFromToken();
    }
  
    ngOnInit(): void {
      console.log('Initializing SignalR connection...');
      this.signalRService.startConnection();
      this.signalRService.getConnectionId();
  
      this.signalRService.getHubConnection().on('ReceiveNotificationAllUser', (result1: any) => {
        this.addNotification(result1);
        this.unreadCount++;
        console.log(result1);
      });
      this.signalRService.getHubConnection().on('ReceiveNotification', (result1: any) => {
        this.addNotification(result1);
        this.unreadCount++;
        console.log(result1);
      });
  
      const receiverId = this.authService.getUserIdFromToken();
      if(this.authService.isLoggedIn()){
      this.notificationService.getNotifications(receiverId).subscribe(data => {
        this.notifications = data;
        this.unreadCount = this.notifications.filter(notification => !notification.isSeen).length;
        console.log(this.notifications);
        this.cdr.detectChanges();
      });
    }
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
        this.notifications.unshift(notification);
    }
  
    removeNotification(notification: any): void {
      const index = this.notification.indexOf(notification);
      if (index !== -1) {
        this.notification.splice(index, 1);
      }
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
  }