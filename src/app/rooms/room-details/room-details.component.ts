import { Component, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('fileInput') fileInput!: ElementRef;
  photos!: File;
  showFileInput: boolean = false;


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
          console.log(photo);
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
  confirmRoomDelete(roomId: string): void {
    if (window.confirm('Are you sure you want to delete the Room?')) {
      this.DeleteRoom(roomId);
    }
  }
  DeleteRoom(roomId:string){
    this.roomService.RoomDelete(roomId)
      .subscribe({
          next: data => {
            this.getRoomDetails();
            console.log('Delete successful');
          },
          error: error => {
              console.error('There was an error!', error);
          }
      });
      
  }
  confirmDelete(photoId: string): void {
    if (window.confirm('Are you sure you want to delete the photo?')) {
      this.DeletePhoto(photoId);
    }
  }
  DeletePhoto(Id:string){
    this.roomPhotoService.deletePhoto(Id)
      .subscribe({
          next: data => {
              console.log('Delete successful');
              this.getRoomDetails();
          },
          error: error => {
              console.error('There was an error!', error);
          }
      });
  }
  chooseFile() {
    this.showFileInput = true;
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    this.photos = event.target.files[0];
  }

  savePhoto() {
    if (!this.photos) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('roomId', this.roomId); // Include roomId in FormData
    formData.append('ImageFile', this.photos);

    this.roomPhotoService.addPhotoToRoom(formData, this.roomId)
  .subscribe({
    next: (response) => {
      console.log('Photo uploaded successfully');
      this.showFileInput = false;
    },
    error: (error) => {
      console.error('Error uploading photo:', error);
    }
  });

  }
} 