import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class SortingComponent implements OnInit {
  sortField!: string;
  @Input() sortOrder: string = 'asc';
  @Input() sortOptions: { value: string; label: string }[] = [];
  @Output() sortChange = new EventEmitter<{ field: string; order: string }>();

  ngOnInit(): void {
    this.sortField = this.sortOptions[0].value;
  }
  constructor() {}
  onSortChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const field = target.value;
    this.sortField = field;
    console.log(this.sortField);
    this.sortChange.emit({ field: this.sortField, order: this.sortOrder });
  }

  onOrderChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const order = target.value;
    this.sortOrder = order;
    this.sortChange.emit({ field: this.sortField, order: this.sortOrder });
  }
}
