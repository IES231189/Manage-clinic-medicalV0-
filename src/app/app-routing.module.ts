import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';
import { LoginComponentComponent } from './auth/components/login-component/login-component.component';
import { userGuard } from './guards/user.guard';

const routes: Routes = [

  {
    path:'admin',
    component:LoginComponentComponent,
    canActivate:[adminGuard]
  },
  {
    path:'user',
    component:LoginComponentComponent,
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
