import { User } from "./user.model";

export interface CreateNotificationDTO{
    messageContent:string;
}
export interface NotificationDTO {
    notificationId:string
    receiverId:string;
    senderId:string;
    messageContent:string;
    isSeen:boolean;
    receiver:User;
    sender:User;
  }
  export interface UpdateNotification{
    notificationId:string
    receiverId:string;
    senderId:string;
    messageContent:string;
    isSeen:boolean;
  }