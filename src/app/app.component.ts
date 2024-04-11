import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Subject, takeUntil, timer } from 'rxjs';
import { SendNotificationsComponent } from './notifications/send-notifications/send-notifications.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule,RouterLink,SendNotificationsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  name = 'ClientApp';
  rooms: any;
  notification: any[] = [];
  private url = 'https://localhost:7006/Notification';
  private hubConnectionBuilder!: HubConnection;
  private destroy$: Subject<void> = new Subject<void>();

  constructor() { }
  ngOnInit(): void {
    console.log('Initializing SignalR connection...');
    this.hubConnectionBuilder = new HubConnectionBuilder()
      .withUrl('https://localhost:7006/Notify')
      .configureLogging(LogLevel.Information)
      .build();
  
    this.hubConnectionBuilder
      .start()
      .then(() => console.log('Connection started.'))
      .catch(err => console.error('Error while connecting to SignalR:', err));

    this.hubConnectionBuilder.on('ReceiveNotificationAllUser', (result: any) => {
      this.addNotification(result);
      console.log(result);
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