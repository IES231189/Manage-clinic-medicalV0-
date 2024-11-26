import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserViewComponentComponent } from './user-view-component/user-view-component.component';
import { UsersDashboardComponent } from './dashboard/dashboard.component';
import { HojaComponent } from './hoja_enfermeria/components/hoja/hoja.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MedicamentosTableComponent } from './medicamentos/components/medicamentos-table/medicamentos-table.component';

@NgModule({
  declarations: [
    UsersDashboardComponent,
    UserViewComponentComponent,
    HojaComponent,
    MedicamentosTableComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule

  ],
  exports:[
    UserViewComponentComponent
  ]
})
export class UsersModule { }
