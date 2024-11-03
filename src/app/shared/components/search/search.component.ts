import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  template: `
    <input
      type="text"
      [placeholder]="placeholder"
      [(ngModel)]="searchText"
      (input)="onSearch()"
    />
  `,
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Input() placeholder: string = 'Buscar ...';
  @Output() search = new EventEmitter<string>();

  searchText: string = '';

  onSearch() {
    this.search.emit(this.searchText)
  }

}
