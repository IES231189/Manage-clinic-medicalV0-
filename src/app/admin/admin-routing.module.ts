import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminViewComponentComponent } from './admin-view-component/admin-view-component.component';


const routes: Routes = [
  {
    path:'' ,
    component: AdminViewComponentComponent,
    children:[
      { path: 'dashboard', loadChildren:() =>import('../admin/dashboard/dashboard.module').then(m=>m.DashboardModule) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
