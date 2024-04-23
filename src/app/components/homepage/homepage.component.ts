import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SearchService } from '../../services/search-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  constructor(private router:Router, private searchService: SearchService){}
  checkInDate!: string;
  checkOutDate!: string;
  capacity!: number;
  rooms!: number;

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  onSubmit() {
    this.searchService.setSearchParameters([{capacity:this.capacity,
      checkInDate:this.checkInDate,
      checkOutDate:this.checkOutDate}]);
    this.router.navigate(['/createReservation']);
  }
}
