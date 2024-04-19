import { CommonModule } from '@angular/common';
import { Component,ChangeDetectorRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil, timer } from 'rxjs';
import { SendNotificationsComponent } from './notifications/send-notifications/send-notifications.component';
import { NotificationService } from './services/notification.service';
import { AuthService } from './services/auth.service';
import { SignalRService } from './services/signal-rservice.service';
import { NotificationDTO } from './shared/notification.model';
import { NotificationListComponent } from './notifications/notification-list/notification-list.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule,RouterLink,SendNotificationsComponent,NotificationListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
  export class AppComponent  {
    name = 'ClientApp';
    notifications: NotificationDTO[] = [];
    unreadCount: number = 0;
    userId: string;
    @ViewChild(NotificationListComponent) notificationList!: NotificationListComponent;
  
    constructor(
      private cdr: ChangeDetectorRef,private authService:AuthService
    ) {
      this.userId = this.authService.getUserIdFromToken();
    }
    ngAfterViewInit(): void {
      this.updateNotificationView();
    }
  
    updateNotificationView(): void {
      if (this.notificationList && this.notificationList.notification) {
        const notificationContainer = document.querySelector('.notification-container') as HTMLElement;
        if (notificationContainer) {
          this.notifications = this.notificationList.notification;
          this.unreadCount = this.notifications.filter(notification => !notification.isSeen).length;
          this.cdr.detectChanges(); 
      }
    }
  }
}