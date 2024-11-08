import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminViewComponentComponent } from './admin-view-component/admin-view-component.component';
import { InventarioComponent } from './inventario/inventario.component';
import { AddMedicamentoComponent } from './medicamentos/components/add-medicamento/add-medicamento.component';
import { ListaMedicamentosComponent } from './medicamentos/components/lista-medicamentos/lista-medicamentos.component';



const routes: Routes = [
  {
    path:'' ,
    component: AdminViewComponentComponent,
    children:[
      { path: 'dashboard', loadChildren:() =>import('../admin/dashboard/dashboard.module').then(m=>m.DashboardModule) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {path:'inventario', component: InventarioComponent },
      {path:'all-medicamentos' , component: ListaMedicamentosComponent},
      {path:'addMedicamentos' , component:AddMedicamentoComponent}
    ]
  },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
