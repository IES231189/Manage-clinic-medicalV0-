import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';
import { LoginComponentComponent } from './auth/components/login-component/login-component.component';
import { userGuard } from './guards/user.guard';
import { AdminViewComponentComponent } from './admin/admin-view-component/admin-view-component.component';
import { UserViewComponentComponent } from './users/user-view-component/user-view-component.component';

const routes: Routes = [

  {
    path:'admin',
    component:AdminViewComponentComponent,
    //canActivate:[adminGuard]
  },
  {
    path:'user',
    component:UserViewComponentComponent,
    canActivate:[userGuard]
  },
  {
    path:'login',
    component:LoginComponentComponent,
  },
  {
    path:'**' ,
    redirectTo :'/login'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
