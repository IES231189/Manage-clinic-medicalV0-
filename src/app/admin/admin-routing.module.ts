import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminViewComponentComponent } from './admin-view-component/admin-view-component.component';

import { AddMedicamentoComponent } from './medicamentos/components/add-medicamento/add-medicamento.component';
import { ListaMedicamentosComponent } from './medicamentos/components/lista-medicamentos/lista-medicamentos.component';
import { AgregarEnfermeras } from './gestionEnfermeras/components/agregar-enfermeras/agregar-enfermeras.component';
import { VerEnfermerasComponent } from './gestionEnfermeras/components/ver-enfermeras/ver-enfermeras.component';
import { VerConsultaComponent } from './Consulta/components/ver-consulta/ver-consulta.component';
import { CalendarioCitasComponent } from './Citas/components/calendario-citas/calendario-citas.component';
import { AddMedicamentoGeneralComponent } from './medicamentos/components/add-medicamento-general/add-medicamento-general.component';
import { FormAddUsuariosComponent } from './users/components/form-add-usuarios/form-add-usuarios.component';
import { VerUsuariosComponent } from './users/components/ver-usuarios/ver-usuarios.component';
import { HospitalizacionComponent } from './Pacientes/hospitalizacion/hospitalizacion.component';

import { authGuard } from '../guards/auth.guard';
import { adminGuard } from '../guards/admin.guard';

const routes: Routes = [
  {
    path:'' ,
    component: AdminViewComponentComponent,
    children:[
      { path: 'dashboard', loadChildren:() =>import('../admin/dashboard/dashboard.module').then(m=>m.DashboardModule) ,
        canActivate: [authGuard, adminGuard],
       },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {path:'all-medicamentos' , component: ListaMedicamentosComponent},

      {path:'addMedicamentos' , component:AddMedicamentoGeneralComponent},
      {path:'Enfermeras' , component:AgregarEnfermeras},
      {path:'verEnfermeras' , component:VerEnfermerasComponent},
      {path:'verConsultas' , component:VerConsultaComponent},
      {path:'addPresentacion',component:AddMedicamentoComponent},
      {path:'calendario',component:CalendarioCitasComponent},
      {path:'citas' , component:CalendarioCitasComponent} ,
      {path:'register' , component:FormAddUsuariosComponent},

      {path:'all-usuarios' , component: VerUsuariosComponent},
      {path:'Pacientes' , component:HospitalizacionComponent}

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
