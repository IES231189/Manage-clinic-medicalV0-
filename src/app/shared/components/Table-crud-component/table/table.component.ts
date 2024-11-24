import { Component, EventEmitter, Input, Output } from '@angular/core';
import { el } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {

  @Input() data: any[] = [];
  @Input() columns: Array<{ name: string, type: string, action?: string }> = [];

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() abrirHoja = new EventEmitter<any>();


  onAction(row: any, action:string) {
    if (action === "edit") {
      this.edit.emit(row);
    } else if (action === "delete") {
      this.delete.emit(row)
    } else if(action === 'abrirHoja'){
      this.abrirHoja.emit(row)
    }
  }
}



