import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [
  {
    path:'',
    component:DashboardComponent,
    children:[
     { path: 'medicamentos', loadChildren:()=>import('../medicamentos/medicamentos.module').then(m=>m.MedicamentosModule)},
     { path:'consultas' , loadChildren:()=>import('../Consulta/consulta.module').then(m=>m.ConsultaModule)}
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
