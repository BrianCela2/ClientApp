import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [],
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.css'
})
export class NotificationListComponent {
  notifications!:any[];
  receiverId!:string;
  constructor(private notificationService:NotificationService,private authService:AuthService){}
  ngOnInit(): void {
    this.receiverId = this.authService.getUserIdFromToken();
    this.notificationService.getNotifications(this.receiverId).subscribe(data => {
      this.notifications = data;
      console.log(this.notifications);
    });
  }
}
