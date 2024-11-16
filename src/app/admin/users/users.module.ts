import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { VerUsuariosComponent } from './components/ver-usuarios/ver-usuarios.component';
import { ModalUsersComponent } from './components/modal-users/modal-users.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormAddUsuariosComponent } from './components/form-add-usuarios/form-add-usuarios.component';


@NgModule({
  declarations: [
    VerUsuariosComponent,
    ModalUsersComponent,
    FormAddUsuariosComponent
  ],
  imports: [
    CommonModule,
     ReactiveFormsModule ,
    FormsModule,
    UsersRoutingModule ,
    SharedModule

  ],
  exports:[
    ModalUsersComponent
  ]
})
export class UsersModule { }
