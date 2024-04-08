import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RoomPhotosService } from '../../services/roomphotos.service';
@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.css'
})
export class RoomDetailsComponent {
  roomId!: string;
  room: any;
  activePhotoIndex: number = 0;

  constructor(private route: ActivatedRoute, 
    private roomService: RoomService,
    private roomPhotoService:RoomPhotosService) {}

  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('id') || '' ;
    this.getRoomDetails();
  }


  getRoomDetails() {
    this.roomService.getRoomById(this.roomId).subscribe({
      next: (room: any) => {
        this.room = room;
        this.room.roomPhotos.forEach((photo: any) => {
          if (photo.photoContent && typeof photo.photoContent === 'string' && photo.photoContent.startsWith('data:image')) {
            return;
          }
          photo.photoContent = `data:image/jpeg;base64,${photo.photoContent}`;
        });
      },
      error: (error) => {
        console.error('Error fetching room:', error);
      }
    });
  }
  setActivePhoto(index: number) {
    this.activePhotoIndex = index;
  }
  DeleteRoom(roomId:string){
    this.roomService.RoomDelete(roomId)
      .subscribe({
          next: data => {
              console.log('Delete successful');
          },
          error: error => {
              console.error('There was an error!', error);
          }
      });
      
  }
  DeletePhoto(roomId:string){
    this.roomPhotoService.DeletePhoto(roomId)
      .subscribe({
          next: data => {
              console.log('Delete successful');
          },
          error: error => {
              console.error('There was an error!', error);
          }
      });
  }
}