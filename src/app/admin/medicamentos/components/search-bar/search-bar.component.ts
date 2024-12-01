import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Output() searchQuery = new EventEmitter<string>();
  query: string = '';

  onSearch(): void {
    this.searchQuery.emit(this.query);
  }
}
