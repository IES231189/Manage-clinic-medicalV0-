import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminViewComponentComponent } from './admin-view-component/admin-view-component.component';

import { AddMedicamentoComponent } from './medicamentos/components/add-medicamento/add-medicamento.component';
import { ListaMedicamentosComponent } from './medicamentos/components/lista-medicamentos/lista-medicamentos.component';
import { AgregarEnfermeras } from './gestionEnfermeras/components/agregar-enfermeras/agregar-enfermeras.component';
import { version } from 'vite';
import { VerEnfermerasComponent } from './gestionEnfermeras/components/ver-enfermeras/ver-enfermeras.component';
import { VerConsultaComponent } from './Consulta/components/ver-consulta/ver-consulta.component';



const routes: Routes = [
  {
    path:'' ,
    component: AdminViewComponentComponent,
    children:[
      { path: 'dashboard', loadChildren:() =>import('../admin/dashboard/dashboard.module').then(m=>m.DashboardModule) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {path:'all-medicamentos' , component: ListaMedicamentosComponent},
      {path:'addMedicamentos' , component:AddMedicamentoComponent},
      {path:'Enfermeras' , component:AgregarEnfermeras},
      {path:'verEnfermeras' , component:VerEnfermerasComponent},
      {path:'verConsultas' , component:VerConsultaComponent}

    ]
  },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
