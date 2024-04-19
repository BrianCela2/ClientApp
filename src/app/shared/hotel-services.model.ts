export interface CreateHotelServiceDTO {
    ServiceName: string;
    Description?: string;
    Price: number;
    Category?: ServiceCategory;
    OpenTime?: string;
}

export interface HotelServiceDTO {
    ServiceID: string;
    ServiceName: string;
    Description?: string;
    Price: number;
    Category?: number;
    OpenTime?: string;
}

export interface UpdateHotelServiceDTO {
    ServiceID: string;
    ServiceName: string;
    Description?: string;
    Price: number;
    Category?: number;
    OpenTime?: string;
}

export enum ServiceCategory {
    RoomService = 1,
    Dining,
    Spa,
    Transportation,
    Entertainment,
    Other
}
