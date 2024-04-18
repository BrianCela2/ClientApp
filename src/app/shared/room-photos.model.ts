 export interface CreateRoomPhotoDTO{
    RoomId:string; 
    ImageFile?: File[];
    }

    export interface RoomPhotoDTO{
        PhotoId:string; 
        PhotoPath:string;
        PhotoContent:string;
        }
        export interface RoomPhotoDTO{
            PhotoId:string; 
            RoomId:string; 
            PhotoPath:string;
            PhotoContent:string;
            }
    
