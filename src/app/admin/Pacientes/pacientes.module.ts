import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalizacionComponent } from './hospitalizacion/hospitalizacion.component';
import { SharedModule } from '../../shared/shared.module';
import { HojaEnfermeriaModalComponent } from './modal-enfermeria/modal-enfermeria.component';

@NgModule({
  declarations: [
    HospitalizacionComponent,
    HojaEnfermeriaModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    HospitalizacionComponent
  ]
})
export class PacientesModule { }
