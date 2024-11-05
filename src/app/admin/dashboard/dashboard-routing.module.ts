import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MedicamentosComponent } from '../medicamentos/components/medicamentos/medicamentos.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent,
    children:[
     { path: 'medicamentos', component: MedicamentosComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
