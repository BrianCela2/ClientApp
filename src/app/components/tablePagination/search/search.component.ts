import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  standalone:true,
  imports:[CommonModule,FormsModule]
})
export class SearchComponent {
  @Output() searchChange = new EventEmitter<string>();
  searchString: string = '';

  constructor() { }

  onSearchButtonClick() {
    this.searchChange.emit(this.searchString);
  }
}
