import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaRoutingModule } from './consulta-routing.module';
import { NuevaConsultaComponent } from './components/nueva-consulta/nueva-consulta.component';
import { VerConsultaComponent } from './components/ver-consulta/ver-consulta.component';
import { ConsultasModalComponent } from './components/consultas-modal/consultas-modal.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NuevaConsultaComponent,
    VerConsultaComponent,
    ConsultasModalComponent
  ],
  imports: [
    CommonModule,
    ConsultaRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ConsultaModule { }
