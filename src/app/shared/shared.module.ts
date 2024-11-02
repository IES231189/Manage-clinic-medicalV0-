import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponentComponent } from './components/Menu/header-component/header-component.component';
import { ProfileUserComponentComponent } from './components/Menu/profile-user-component/profile-user-component.component';
import { RouterModule } from '@angular/router';
import { TableComponent } from './components/Table-crud-component/table/table.component';
import { EditFromTableComponent } from './components/Table-crud-component/edit-from-table/edit-from-table.component';
import { DeleteFromTableComponent } from './components/Table-crud-component/delete-from-table/delete-from-table.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [HeaderComponentComponent,
    ProfileUserComponentComponent,
    TableComponent,
    EditFromTableComponent,
    DeleteFromTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule

  ],
  exports: [
    HeaderComponentComponent,
    TableComponent,
    EditFromTableComponent,
    DeleteFromTableComponent
  ]
})
export class SharedModule { }
