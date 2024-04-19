import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelServiceService } from '../../services/hotel-service.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-hotel-service-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotel-service-details.component.html',
  styleUrls: ['./hotel-service-details.component.css']
})
export class HotelServiceDetailsComponent implements OnInit {
  serviceId!: string;
  service: any;

  constructor(
    private route: ActivatedRoute,
    private hotelServiceService: HotelServiceService
  ) { }

  ngOnInit(): void {
    // Get the service ID from the route parameter
    this.serviceId = this.route.snapshot.paramMap.get('id')!;
    // Load the hotel service details
    this.loadHotelService();
  }

  // Function to load hotel service details
  loadHotelService(): void {
    this.hotelServiceService.getHotelServiceById(this.serviceId).subscribe(
      (data: any) => {
        // Assign the retrieved service data to the service variable
        this.service = data;
      },
      (error: any) => {
        // Log any errors to the console
        console.log(error);
      }
    );
  }
}
