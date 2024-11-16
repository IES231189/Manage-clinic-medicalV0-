import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalUsersComponent } from './components/modal-users/modal-users.component';

const routes: Routes = [
  {path:'' , component: ModalUsersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
