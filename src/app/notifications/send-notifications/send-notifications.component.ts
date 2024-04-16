import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { CreateNotificationDTO } from '../../shared/notification.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-notifications',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './send-notifications.component.html',
  styleUrl: './send-notifications.component.css'
})
export class SendNotificationsComponent {
  notification: CreateNotificationDTO = { messageContent: '' };
  constructor(private router:Router,private notificationService: NotificationService) { }
  SendNotification() {
    console.log('Notification data:', this.notification); 
    this.notificationService.SendNotification(this.notification).subscribe({
      next: (response: any) => {
        console.log('Notification created successfully:', response);
        this.router.navigateByUrl('/NotificationAllUsers');
      },
      error: (error: any) => {
        console.error('Error creating notification:', error);
      }
    });
  }
}
