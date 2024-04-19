import { ReservationRoom } from "./reservationRooms.mode";
import { CreateReservationService, ReservationService } from "./reservationService.model";
import { User } from "./user.model";

export interface Reservation {
    reservationId: string;
    totalPrice: number;
    reservationDate: Date | null;
    reservationStatus: ReservationStatusEnum;
    userId: string;
    reservationRooms: ReservationRoom[];
    reservationServices?: ReservationService[];
    user:User;
  }
  export enum ReservationStatusEnum {
    Confirmed="Confirmed",
    Canceled ="Canceled"
  }

  export interface UpdateReservationStatus {
    reservationId: string;
    reservationStatus: number;
  }

  export interface UpdateReservation {
    ReservationId: string;
    ReservationDate: Date | null;
    ReservationRooms: ReservationRoom[];
    ReservationServices?: ReservationService[];
  }

  export interface ReservationSample {
    ReservationStatus: ReservationStatusEnum;
    ReservationDate: Date | null;
    ReservationRooms: ReservationRoom[];
    ReservationServices?: CreateReservationService[];
  }

  
export interface CreateReservation {
    ReservationDate: Date | null;
    ReservationStatus: ReservationStatusEnum;
    ReservationRooms: ReservationRoom[];
    ReservationServices?: CreateReservationService[];
  }