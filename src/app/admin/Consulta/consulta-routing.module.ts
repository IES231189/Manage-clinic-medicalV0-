import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultasModalComponent } from './components/consultas-modal/consultas-modal.component';
import { NuevaConsultaComponent } from './components/nueva-consulta/nueva-consulta.component';

const routes: Routes = [
  {
    path:'',
    component:ConsultasModalComponent,
    children:[
      {path:'AgregarConsultas' , component:NuevaConsultaComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaRoutingModule { }
