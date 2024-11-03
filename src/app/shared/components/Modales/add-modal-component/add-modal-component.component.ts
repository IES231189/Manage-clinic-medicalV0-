import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-modal-component',
  templateUrl: './add-modal-component.component.html',
  styleUrl: './add-modal-component.component.css'
})
export class AddModalComponentComponent {
  @Input() isVisible: boolean = false;
  @Input() title: string = 'Agregar Registro';
  @Input() fields: Array<{ name: string; label: string; type: string }> = [];

  @Output() submitForm = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  formData: { [key: string]: any } = {};

  onSubmit() {
    this.submitForm.emit(this.formData);
  }

  onCancel(){
    this.cancel.emit();
  }

}
