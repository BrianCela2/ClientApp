import { Component, OnInit } from '@angular/core';
import { HotelServiceService } from '../../services/hotel-service.service';
import { RouterModule } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-hotel-service-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './hotel-service-list.component.html',
  styleUrls: ['./hotel-service-list.component.css']
})

export class HotelServiceListComponent implements OnInit {
  hotelServices: any[] = [];

  constructor(private hotelServiceService: HotelServiceService) { }

  ngOnInit(): void {
    // Load the hotel services when the component initializes
    this.loadHotelServices();
  }

  // Function to load hotel services
  loadHotelServices(): void {
    this.hotelServiceService.getAllHotelServices().subscribe(
      (data: any[]) => {
        // Assign retrieved hotel services to the hotelServices array
        this.hotelServices = data;
        console.log(data);
      },
      (error: any) => {
        // Log any errors to the console
        console.log(error);
      }
    );
  }
}

