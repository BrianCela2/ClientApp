import { ReservationService } from "../services/reservation.service";
import { ReservationRoom } from "./reservationRooms.mode";
import { CreateReservationService } from "./reservationService.model";

export interface Reservation {
    reservationId: string;
    totalPrice: number;
    reservationDate: Date | null;
    reservationStatus: ReservationStatusEnum;
    userId: string;
    reservationRooms: ReservationRoom[];
    reservationServices?: ReservationService[];
  }
  export enum ReservationStatusEnum {
    Confirmed = 1,
    Canceled
  }

  export interface UpdateReservationStatus {
    ReservationId: string;
    ReservationStatus: number;
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