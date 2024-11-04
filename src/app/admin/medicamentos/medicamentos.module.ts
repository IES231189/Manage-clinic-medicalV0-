import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicamentosComponent } from './components/medicamentos/medicamentos.component';



@NgModule({
  declarations: [
    MedicamentosComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    MedicamentosComponent
  ]
})
export class MedicamentosModule { }
