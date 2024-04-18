import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css'],
  standalone: true,
})
export class SortingComponent {
  @Input() sortField: string = "FirstName";
  @Input() sortOrder: string = "asc";
  @Output() sortChange = new EventEmitter<{ field: string, order: string }>();

  constructor() { }

  onSortChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const field = target.value;
    this.sortField = field;
    console.log(this.sortField)
    this.sortChange.emit({ field: this.sortField, order: this.sortOrder });
  }

  onOrderChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const order = target.value;
    this.sortOrder = order;
    this.sortChange.emit({ field: this.sortField, order: this.sortOrder });
  }
}
