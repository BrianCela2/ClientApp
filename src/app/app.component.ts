import { CommonModule } from '@angular/common';
import {Component,ChangeDetectorRef, ViewChild} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SendNotificationsComponent } from './notifications/send-notifications/send-notifications.component';
import { AuthService } from './services/auth.service';
import { NotificationDTO } from './shared/notification.model';
import { NotificationListComponent } from './notifications/notification-list/notification-list.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { PopUpComponent } from './components/popup/popup.component';
import { ToasterPosition } from './shared/popup.model';
import { FooterComponent } from './components/footer/footer.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    RouterLink,
    SendNotificationsComponent,
    NotificationListComponent,
    SpinnerComponent,
    NavbarComponent,
    PopUpComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  name = 'ClientApp';
  notifications: NotificationDTO[] = [];
  unreadCount: number = 0;
  userId: string;
  @ViewChild(NotificationListComponent)notificationList!: NotificationListComponent;
  public ToasterPosition = ToasterPosition;

  constructor(
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {
    this.userId = this.authService.getUserIdFromToken();
  }
  ngAfterViewInit(): void {
    this.updateNotificationView();
  }

  updateNotificationView(): void {
    if (this.notificationList && this.notificationList.notification) {
              this.notifications = this.notificationList.notification;
        this.cdr.detectChanges();
    }
  }
}