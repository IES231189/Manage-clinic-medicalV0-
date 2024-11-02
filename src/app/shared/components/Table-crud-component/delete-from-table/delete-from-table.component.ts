import { Component, EventEmitter,Input ,Output } from '@angular/core';

@Component({
  selector: 'app-delete-from-table',
  templateUrl: './delete-from-table.component.html',
  styleUrl: './delete-from-table.component.css'
})
export class DeleteFromTableComponent {
  @Input() registroTable : any;
  @Output() confirmDelete = new EventEmitter<void>();
  @Output() cancelDelete = new EventEmitter<void>();


  onConfirmDelete(){
    this.confirmDelete.emit();
  }

  onCancel(){
    this.cancelDelete.emit();
  }

}
