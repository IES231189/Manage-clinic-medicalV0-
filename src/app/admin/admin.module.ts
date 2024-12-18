import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminViewComponentComponent } from './admin-view-component/admin-view-component.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnfermerasModuloModule } from './gestionEnfermeras/enfermeras-modulo.module';
import { CitasModule } from './Citas/citas.module';
import { FormAddUsuariosComponent } from './users/components/form-add-usuarios/form-add-usuarios.component';
import { UsersModule } from './users/users.module';
import { PacientesModule } from './Pacientes/pacientes.module';



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
    CitasModule,
    FormsModule,
    UsersModule,
    PacientesModule

  ]
})
export class AdminModule { }
