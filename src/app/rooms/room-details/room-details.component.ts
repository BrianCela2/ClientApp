import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RoomPhotosService } from '../../services/roomphotos.service';
import { UserRoleService } from '../../services/user-role.service';
import { AuthService } from '../../services/auth.service';
import { RoomCategory, RoomDTO, RoomStatus } from '../../shared/room.model';
import { RoomPhotoDTO } from '../../shared/room-photos.model';
import { PopupService } from '../../services/popup.service';
@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.css',
})
export class RoomDetailsComponent {
  roomId!: string;
  room: RoomDTO = {
    roomId: '',
    roomNumber: 0,
    capacity: 0,
    price: 0,
    roomStatus: RoomStatus.Available,
    category: RoomCategory.Suit,
    roomPhotos: [],
  };
  role!: string;
  activePhotoIndex: number = 0;
  @ViewChild('fileInput') fileInput!: ElementRef;
  photos!: File;
  showFileInput: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private roomPhotoService: RoomPhotosService,
    private router: Router,
    private userRole: UserRoleService,
    private _toasterService: PopupService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('id') || '';
    this.getRoomDetails();
    this.userRole.getRole().subscribe((val) => {
      console.log(val);
      const roleFromToken = this.authService.getRoleFromToken();
      console.log(roleFromToken);
      this.role = val || roleFromToken;
    });
  }

  getRoomDetails() {
    this.roomService.getRoomById(this.roomId).subscribe({
      next: (room: RoomDTO) => {
        this.room = room;
        console.log(this.room);
        if (this.room.roomPhotos) {
          this.room.roomPhotos.forEach((photo: RoomPhotoDTO) => {
            if (
              photo.photoContent &&
              typeof photo.photoContent === 'string' &&
              photo.photoContent.startsWith('data:image')
            ) {
              return;
            }
            photo.photoContent = `data:image/jpeg;base64,${photo.photoContent}`;
            console.log(photo);
          });
        }
      },
      error: (error) => {
        console.error('Error fetching room:', error);
      },
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
  DeleteRoom(roomId: string) {
    this.roomService.RoomDelete(roomId).subscribe({
      next: (data) => {
        this.getRoomDetails();
        console.log('Delete successful');
        this._toasterService.success('Room deleted successfully');
      },
      error: (error) => {
        console.error('There was an error!', error);
        this._toasterService.danger('Something went wrong');
      },
    });
  }
  confirmDelete(photoId: string): void {
    if (window.confirm('Are you sure you want to delete the photo?')) {
      this.DeletePhoto(photoId);
    }
  }
  DeletePhoto(Id: string) {
    this.roomPhotoService.deletePhoto(Id).subscribe({
      next: (data) => {
        console.log('Delete successful');
        this._toasterService.success('Room photo deleted successfully');
        this.getRoomDetails();
      },
      error: (error) => {
        console.error('There was an error!', error);
        this._toasterService.danger('Something went wrong');
      },
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
    formData.append('roomId', this.roomId);
    formData.append('ImageFile', this.photos);

    this.roomPhotoService.addPhotoToRoom(formData, this.roomId).subscribe({
      next: (response) => {
        console.log('Photo uploaded successfully');
        this._toasterService.success('Photo uploaded successfully');
        this.showFileInput = false;
      },
      error: (error) => {
        console.error('Error uploading photo:', error);
        this._toasterService.danger('Something went wrong');
      },
    });
  }
  GoToEdit(): void {
    this.router.navigate(['/Room/Edit', this.roomId]);
  }
}
