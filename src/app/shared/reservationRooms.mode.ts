import { Reservation } from "./reservation.model";
import { RoomDTO } from "./room.model";

export interface ReservationRoom {
    roomId: string;
    checkInDate: Date;
    checkOutDate: Date;
  }

  export interface ReservationRoomDetails {
    roomId: string;
    checkInDate: Date;
    checkOutDate: Date;
    reservation:Reservation;
    room:RoomDTO;
  }