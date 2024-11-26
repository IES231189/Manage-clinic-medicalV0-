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
    loadChildren:()=> import('./admin/admin.module').then(m =>m.AdminModule),
    //canActivate:[adminGuard]

  },
  {
    path:'user',
    loadChildren:()=> import('./users/users.module').then(m => m.UsersModule)
    /*canActivate:[userGuard]*/
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
