import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicamentosComponent } from './components/medicamentos/medicamentos.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    MedicamentosComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    MedicamentosComponent
  ]
})
export class MedicamentosModule { }
