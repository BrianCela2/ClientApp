import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { CreateNotificationDTO } from '../../shared/notification.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-send-notifications',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './send-notifications.component.html',
  styleUrl: './send-notifications.component.css',
})
export class SendNotificationsComponent {
  notification: CreateNotificationDTO = { messageContent: '' };
  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private _toasterService: PopupService
  ) {}
  SendNotification() {
    console.log('Notification data:', this.notification);
    this.notificationService.SendNotification(this.notification).subscribe({
      next: (response: CreateNotificationDTO) => {
        console.log('Notification created successfully:', response);
        this._toasterService.success('Notification created successfully');
        this.router.navigateByUrl('/NotificationAllUsers');
      },
      error: (error: any) => {
        console.error('Error creating notification:', error);
        this._toasterService.danger('Something went wrong');
      },
    });
  }
}
