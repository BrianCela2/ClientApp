import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { RoomCategory, UpdateRoomDTO, RoomStatus } from '../../shared/room.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-room',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-room.component.html',
  styleUrl: './edit-room.component.css'
})
export class EditRoomComponent implements OnInit {
  roomId!: string;
  updateRoomDto: UpdateRoomDTO = {
    roomId: '',
    roomNumber: 0,
    price: 0,
    roomStatus: RoomStatus.Available,
    category: RoomCategory.Mini
  };
  roomStatusOptions: { value: RoomStatus; label: string }[] = []; 
  roomCategoryOptions: { value: RoomCategory; label: string }[] = []; 
  constructor(private route: ActivatedRoute, private roomService: RoomService) {}

  ngOnInit(): void {
    this.roomId = this.route.snapshot.paramMap.get('id') || '';
    this.roomStatusOptions = Object.keys(RoomStatus)
  .filter((key: string) => !isNaN(Number(RoomStatus[key as keyof typeof RoomStatus])))
  .map((key: string) => ({ value: RoomStatus[key as keyof typeof RoomStatus], label: key }));

this.roomCategoryOptions = Object.keys(RoomCategory)
  .filter((key: string) => !isNaN(Number(RoomCategory[key as keyof typeof RoomCategory])))
  .map((key: string) => ({ value: RoomCategory[key as keyof typeof RoomCategory], label: key }));

    this.roomService.getRoomById(this.roomId).subscribe({
      next: (response: any) => {
        this.updateRoomDto.roomId = response.id;
        this.updateRoomDto.roomNumber = response.roomNumber;
        this.updateRoomDto.price = response.price;
        this.updateRoomDto.capacity = response.capacity || null;
        this.updateRoomDto.roomStatus = response.roomStatus || RoomStatus.Available;
        this.updateRoomDto.category = response.category || RoomCategory.Mini;
        console.log(response);
      },
      error: (error) => {
        console.error('Error fetching room data:', error);
      }
    });
  }

  updateRoom(): void {
    this.roomService.updateRoom(this.roomId, this.updateRoomDto).subscribe({
      next: (response) => {
        console.log('Room updated successfully');
      },
      error: (error) => {
        console.error('Error updating room:', error);
      },
      complete: () => {
      }
    });
  }
}
