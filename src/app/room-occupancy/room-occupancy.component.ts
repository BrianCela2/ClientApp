import { Component } from '@angular/core';

@Component({
  selector: 'app-room-occupancy',
  standalone: true,
  imports: [],
  templateUrl: './room-occupancy.component.html',
  styleUrl: './room-occupancy.component.css'
})
export class RoomOccupancyComponent {
  roomOccupancy!: Number;
}
