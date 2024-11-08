// edit-from-table.component.ts
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-edit-from-table',
  templateUrl: './edit-from-table.component.html',
  styleUrls: ['./edit-from-table.component.css']
})
export class EditFromTableComponent implements OnChanges {
  @Input() registroTable: any;
  @Output() GuardarCambios = new EventEmitter<any>();

  editedData: any = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['registroTable'] && changes['registroTable'].currentValue) {
      this.editedData = { ...this.registroTable };
    }
  }

  OnSave() {
    this.GuardarCambios.emit(this.editedData);
  }

  OnCancel() {
    this.editedData = { ...this.registroTable };
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
