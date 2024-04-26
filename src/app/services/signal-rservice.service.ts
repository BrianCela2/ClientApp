import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: HubConnection;
  private connectionId!: Promise<string>; 

  constructor(private authService: AuthService) {}

  startConnection(): void {
    const token = this.authService.getToken();
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7006/Notify', {
        accessTokenFactory: () => token || ''
      })
      .configureLogging(LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => {
        this.getConnection(); 
      })
      .catch(err => console.error('Error while connecting to SignalR:', err));
  }

   getConnection(): void {
    this.connectionId = this.hubConnection.invoke('getconnectionid',this.authService.getUserIdFromToken()) 
      .then((data: string) => {
        return data; 
      })
      .catch(error => {
        console.error('Error getting connection ID:', error);
        return ''; 
      });
  }

  getHubConnection(): HubConnection {
    return this.hubConnection;
  }

  getConnectionId(): Promise<string> {
    return this.connectionId;
  }
}
