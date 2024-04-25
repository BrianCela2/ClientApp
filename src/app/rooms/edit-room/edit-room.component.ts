import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateRoomComponent } from '../create-room/create-room.component';
import { PopupService } from '../../services/popup.service';
import { UpdateRoomDTO } from '../../shared/room.model';

@Component({
  selector: 'app-edit-room',
  standalone: true,
  imports: [FormsModule,CommonModule,CreateRoomComponent,ReactiveFormsModule],
  templateUrl: './edit-room.component.html',
  styleUrl: './edit-room.component.css'
})
export class EditRoomComponent implements OnInit {
  editRoomForm: any = {}; 
  roomId!: any;
  error: any;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private router: Router,
    private toasterService: PopupService
  ) { }

  ngOnInit(): void {
    this.roomId = this.route.snapshot.paramMap.get('id');

    this.roomService.getRoomById(this.roomId).subscribe(
      (room: any) => {
        this.editRoomForm = room; 
      },
      (error) => {
        this.handleError();
      }
    );
  }

  onSubmit(): void {
    if (!this.editRoomForm) {
      return; 
    }

    this.roomService.updateRoom(this.roomId, this.editRoomForm)
      .subscribe({
        next: () => {
          this.handleSuccess();
        },
        error: (error) => {
          this.handleError();
        }
      });
  }

  private handleError(): void {
    this.toasterService.danger('Failed to update room.');
  }

  private handleSuccess(): void {
    this.toasterService.success('Room updated successfully');
    this.router.navigateByUrl('/Room/Get/' + this.roomId);
  }
}