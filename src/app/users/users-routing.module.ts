import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserViewComponentComponent } from './user-view-component/user-view-component.component';
import { UsersDashboardComponent } from './dashboard/dashboard.component';
import { HojaComponent } from './hoja_enfermeria/components/hoja/hoja.component';

const routes: Routes = [
  {path:'' , component:UserViewComponentComponent ,
    children:[
      {path: 'dashboard' , component:UsersDashboardComponent},
      {path:'' ,redirectTo:'dashboard' , pathMatch:'full'},
      {path:'medicamentos' , component:HojaComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
