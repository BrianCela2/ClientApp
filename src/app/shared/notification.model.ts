import { User } from "./user.model";

export interface CreateNotificationDTO{
    messageContent:string;
}
export interface NotificationDTO {
    notificationId:string
    receiverId:string;
    senderId:string;
    sendDateTime:Date;
    messageContent:string;
    isSeen:boolean;
    contentId:string;
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