import { Component, EventEmitter, Output, output } from '@angular/core';

@Component({
  selector: 'app-add-button-component',
  template: `

  <button class="" (click)="onAdd()") >Agregar</button>

  `,
  styleUrl: './add-button-component.component.css'
})
export class AddButtonComponentComponent {

  @Output() addClick = new EventEmitter<void>();


  onAdd(){
    this.addClick.emit();
  }

}
