import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoomService } from '../../services/room.service';
import {FormBuilder,FormsModule,FormGroup,ReactiveFormsModule,Validators,
} from '@angular/forms';import { Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-room',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './create-room.component.html',
  styleUrl: './create-room.component.css'
})
export class CreateRoomComponent implements OnInit {
  roomForm: FormGroup;
  private roomsSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private roomService: RoomService,
    private formBuilder: FormBuilder
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
          this.router.navigateByUrl('/Room/GetAll');
        },
        error: (error: any) => {
          console.error('Error creating room:', error);
        }
      });
    } else {
      console.log('Form is invalid. Cannot submit.');
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