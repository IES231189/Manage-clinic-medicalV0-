import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarEnfermeras } from './components/agregar-enfermeras/agregar-enfermeras.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VerEnfermerasComponent } from './components/ver-enfermeras/ver-enfermeras.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    AgregarEnfermeras,
    VerEnfermerasComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    SharedModule
  ]
})
export class EnfermerasModuloModule { }
