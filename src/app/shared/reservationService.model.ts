export interface ReservationService {
    ReservationId: string;
    ServiceId: string;
    DateOfPurchase: Date;
  }

  export interface CreateReservationService {
    ServiceId: string;
    DateOfPurchase: Date;
  }