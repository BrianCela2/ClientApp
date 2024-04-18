import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  standalone:true,
})
export class SearchComponent {
  @Output() searchChange = new EventEmitter<string>();

  constructor() { }

  onSearchChange(event: Event) {
    const searchString = (event.target as HTMLInputElement).value;
    this.searchChange.emit(searchString);
  }
}
