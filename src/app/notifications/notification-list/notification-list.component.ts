import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';
import { NotificationDTO } from '../../shared/notification.model';
import { CommonModule } from '@angular/common';
import { Component,ChangeDetectorRef, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Subject, takeUntil, timer } from 'rxjs';
import { SignalRService } from '../../services/signal-rservice.service';
@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.css'
})
export class NotificationListComponent implements OnInit {
  notifications: NotificationDTO[] = [];
  notification: NotificationDTO[] = [];
  @Output() notificationData: EventEmitter<any> = new EventEmitter<any>();

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
    console.log('SignalR connection');
      this.signalRService.startConnection();
      this.signalRService.getConnectionId();
  
      this.signalRService.getHubConnection().on('SendNotificationAll', (result: NotificationDTO) => {
        this.addNotification(result);
        this.unreadCount++;
      });
      this.signalRService.getHubConnection().on('SendNotification', (result: NotificationDTO) => {
        this.addNotification(result);
        this.unreadCount++;
      });
  
      const receiverId = this.authService.getUserIdFromToken();
      if(this.authService.isLoggedIn()){
      this.notificationService.getNotifications(receiverId).subscribe(data => {
        this.notifications = data;
        this.unreadCount = this.notifications.filter(notification => !notification.isSeen).length;
        this.cdr.detectChanges();
      });
    }
  }
    
    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
    calculateTimeDifference(sendDateTime: Date): string {
      const now = new Date();
      const notificationTime = new Date(sendDateTime);
      const differenceInSeconds = Math.floor((now.getTime() - notificationTime.getTime()) / 1000);
      let result: string;
  
      if (differenceInSeconds < 60) {
        result = `${differenceInSeconds} seconds ago`;
      } else if (differenceInSeconds < 3600) {
        result = `${Math.floor(differenceInSeconds / 60)} minutes ago`;
      } else if (differenceInSeconds < 86400) {
        result = `${Math.floor(differenceInSeconds / 3600)} hours ago`;
      } else {
        result = `${Math.floor(differenceInSeconds / 86400)} days ago`;
      }
  
      return result;
    }
    addNotification(notification: any): void {
      this.notification.unshift(notification);
      timer(7000)
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
        },
        error: (error) => {
        }
      });
    }
}