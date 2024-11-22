import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MedicamentosModule } from '../medicamentos/medicamentos.module';
import { SharedModule } from '../../shared/shared.module';
import { ConsultaModule } from '../Consulta/consulta.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MedicamentosModule,
    SharedModule,
    ConsultaModule
  ],
  exports:[
    DashboardComponent,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
