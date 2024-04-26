import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoomService } from '../../../services/room.service';
import {FormBuilder,FormsModule,FormGroup,ReactiveFormsModule,Validators,
} from '@angular/forms';import { Route, Router } from '@angular/router';
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
  private roomsSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private roomService: RoomService,
    private formBuilder: FormBuilder,
    private _toasterService: PopupService
  ) {
    this.roomForm = this.formBuilder.group({
      roomNumber: [null, Validators.required],
      capacity: [null, Validators.required],
      price: [null, Validators.required],
      roomStatus: [null, Validators.required],
      category: [null, Validators.required],
      photos: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.roomForm.valid) {
      console.log('Room data:', this.roomForm.value);
      this.roomService.createRoom(this.roomForm.value).subscribe({
        next: (response: any) => {
          console.log('Room created successfully:', response);
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
    this.roomForm.patchValue({ photos: event.target.files });
  }

  ngOnDestroy(): void {
    if (this.roomsSubscription) {
      this.roomsSubscription.unsubscribe();
    }
  }
}