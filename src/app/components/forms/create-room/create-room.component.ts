import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoomService } from '../../../services/room.service';
import {FormBuilder,FormsModule,FormGroup,ReactiveFormsModule,Validators} from '@angular/forms';import { Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PopupService } from '../../../services/popup.service';

@Component({
  selector: 'app-create-room',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './create-room.component.html',
  styleUrl: './create-room.component.css',
})
export class CreateRoomComponent implements OnInit {
  roomForm: FormGroup;

  constructor(
    private router: Router,
    private roomService: RoomService,
    private formBuilder: FormBuilder,
    private _toasterService: PopupService
  ) {
    this.roomForm = this.formBuilder.group({
      roomNumber: [null, [Validators.required,Validators.min(1)]],
      capacity: [null, [Validators.required, Validators.min(1)]], 
      price: [null, [Validators.required, Validators.min(1)]], 
      roomStatus: [null, Validators.required],
      category: [null, Validators.required],
      photos: [null ,Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.roomForm.valid) {
      console.log('Room data:', this.roomForm.value);

      const formData = new FormData();
      formData.append('roomNumber', this.roomForm.value.roomNumber);
      formData.append('capacity', this.roomForm.value.capacity);
      formData.append('price', this.roomForm.value.price);
      formData.append('roomStatus', this.roomForm.value.roomStatus);
      formData.append('category', this.roomForm.value.category);

      if (this.roomForm.value.photos) {
        const files = this.roomForm.value.photos;
        for (let i = 0; i < files.length; i++) {
          formData.append('photos', files[i]);
        }
      }

      this.roomService.createRoom(formData).subscribe({
        next: (response: any) => {
          this._toasterService.success('Room created successfully');
          this.router.navigateByUrl('/Room/GetAll');
        },
        error: (error: any) => {
          this._toasterService.danger('Something went wrong. Cannot submit.');
        }
      });
    } else {
      this._toasterService.danger('Form is invalid. Cannot submit.');
    }
  }

  resetForm() {
    this.roomForm.reset();
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const files = event.target.files;
      this.roomForm.patchValue({ photos: files });
    }
  }

  getError(controlName: string): string {
    const control = this.roomForm.get(controlName);
    if (control && control.touched && control.invalid) {
      if (control.errors?.['required']) {
        return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required`;
      } else if (control.errors?.['min']) {
        return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} cannot be negative`;
      }
    }
    return '';
  }
}