import { Component , EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-from-table',
  templateUrl: './edit-from-table.component.html',
  styleUrl: './edit-from-table.component.css'
})
export class EditFromTableComponent  {
  @Input() registroTable :any;
  @Output() GuardarCambios = new EventEmitter<any>();

  editedData:any = {};

  ngOninit():void{
    this.editedData = {...this.registroTable}
  }

  OnSave(){
    this.GuardarCambios.emit(this.editedData)
  }

  OnCancel(){
    this.editedData = {...this.registroTable}
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
