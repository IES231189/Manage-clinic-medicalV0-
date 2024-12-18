import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserViewComponentComponent } from './user-view-component/user-view-component.component';
import { UsersDashboardComponent } from './dashboard/dashboard.component';
import { HojaComponent } from './hoja_enfermeria/components/hoja/hoja.component';
import { ListaMedicamentosComponent } from '../admin/medicamentos/components/lista-medicamentos/lista-medicamentos.component';
import { authGuard } from '../guards/auth.guard';
import { userGuard } from '../guards/user.guard';

const routes: Routes = [
  {path:'' , component:UserViewComponentComponent ,
    children:[
      {path: 'dashboard' , component:UsersDashboardComponent,
         canActivate:[authGuard , userGuard]
         },
      {path:'' ,redirectTo:'dashboard' , pathMatch:'full'},
      {path:'hoja-enfermeria' , component:HojaComponent},
      {path:'medicamentos' , component:ListaMedicamentosComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
