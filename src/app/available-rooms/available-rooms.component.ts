import { Component } from '@angular/core';

@Component({
  selector: 'app-available-rooms',
  standalone: true,
  imports: [],
  templateUrl: './available-rooms.component.html',
  styleUrl: './available-rooms.component.css'
})
export class AvailableRoomsComponent {
  availableRoomsCount !: Number;
}
