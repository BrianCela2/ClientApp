import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../../services/search-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'step-one',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.css'
})
export class StepOneComponent implements OnInit {
  constructor(private http: HttpClient, private searchService: SearchService) { }
  searchParameters: any[] = [];
  roomLists: any[] = [];
  capacity!: number;
  checkInDate!: string;
  checkOutDate!: string;
  
  ngOnInit(): void {
    this.addSearchParameter()
  }
  addSearchParameter() {
    this.searchParameters.push({
      capacity: this.capacity,
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate
    });
    // Not resetting form fields here
    this.searchService.setSearchParameters(this.searchParameters); // Set search parameters in the service
  }
  
}
