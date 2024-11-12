import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminViewComponentComponent } from './admin-view-component/admin-view-component.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { MedicamentosModule } from './medicamentos/medicamentos.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EnfermerasModuloModule } from './gestionEnfermeras/enfermeras-modulo.module';



@NgModule({
  declarations: [
    AdminViewComponentComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    DashboardModule,
    EnfermerasModuloModule,
    
  ]
})
export class AdminModule { }
