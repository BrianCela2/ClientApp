import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../../services/search-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'step-one',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.css',
})
export class StepOneComponent implements OnInit {
  constructor(private http: HttpClient, private searchService: SearchService) {}
  @Output() onStepCompleted = new EventEmitter();
  searchParameters: any[] = [];
  roomLists: any[] = [];
  capacity!: number;
  checkInDate!:string;
  checkOutDate!:string;
  datesConfirmed: boolean = false; 

  ngOnInit(): void {
    this.addSearchParameter();
  }
  addSearchParameter() {
    this.searchParameters.push({
      capacity: this.capacity,
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
    });
    this.searchService.setSearchParameters(this.searchParameters);
  }
  removeSearchParameter(index: number) {
    this.searchParameters.splice(index, 1);
    this.searchService.setSearchParameters(this.searchParameters);
  }

confirmDates() {
  this.searchParameters.forEach(parameter => parameter.error = '');

  for (let parameter of this.searchParameters) {
    if (!parameter.capacity || !parameter.checkInDate || !parameter.checkOutDate) {
      parameter.error = "Please fill in all fields.";
    }

    if (new Date(parameter.checkOutDate) < new Date(parameter.checkInDate)) {
      parameter.error = "Checkout date cannot be earlier than check-in date.";
    }
  }
  const hasError = this.searchParameters.some(parameter => parameter.error !== '');
  if (hasError) {
    return;
  }
  this.datesConfirmed = true; 
  this.onStepCompleted.emit(); 
}

}
