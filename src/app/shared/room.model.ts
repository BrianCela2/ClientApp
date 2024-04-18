import { RoomPhotoDTO } from "./room-photos.model";

export interface CreateRoomDTO {
    roomNumber: number;
    capacity?: number;
    price: number;
    roomStatus?: RoomStatus;
    category?: RoomCategory;
    photos?: File[];
  }
  export interface UpdateRoomDTO {
    roomId:string;
    roomNumber: number;
    capacity?: number;
    price: number;
    roomStatus?: RoomStatus;
    category?: RoomCategory;
    photos?: File[];
  }
  export enum RoomCategory {
    Suit = 1,
    Presidential = 2,
    Mini = 3
  }
  
  export enum RoomStatus {
    Available = 1,
    Busy = 2,
    Working = 3,
    Cleaning = 4
  }

    export interface RoomDTO
    {
         roomId:string,
         roomNumber:number,
         capacity:number,
         price :number,
         roomStatus : RoomStatus ,
         category: RoomCategory,
         roomPhotos:RoomPhotoDTO[]
    }




  