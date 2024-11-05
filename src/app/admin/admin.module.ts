// src/app/admin/admin.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RecetarioComponent } from './recetario/recetario.component';
import { HistorialConsultasComponent } from './historial-consultas/historial-consultas.component';
import { MedicamentosComponent } from './medicamentos/medicamentos.component';
import { AgendaComponent } from './agenda/agenda.component';
import { CamillasComponent } from './camillas/camillas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    RecetarioComponent,
    HistorialConsultasComponent,
    MedicamentosComponent,
    AgendaComponent,
    CamillasComponent,
    UsuariosComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [DashboardComponent]
})
export class AdminModule { }
