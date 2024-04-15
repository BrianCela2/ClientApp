export interface CreateNotificationDTO{
    messageContent:string;
}
export interface Notification {
    id: number;
    message: string;
    userId: string; 
  }