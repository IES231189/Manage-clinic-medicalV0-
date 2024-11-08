import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminViewComponentComponent } from './admin-view-component/admin-view-component.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { InventarioComponent } from './inventario/inventario.component';
import { MedicamentosModule } from './medicamentos/medicamentos.module';


@NgModule({
  declarations: [
    AdminViewComponentComponent,
    InventarioComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    DashboardModule
  ]
})
export class AdminModule { }
