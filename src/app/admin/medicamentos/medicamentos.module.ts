import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicamentosComponent } from './components/medicamentos/medicamentos.component';
import { SharedModule } from '../../shared/shared.module';
import { medicamentosrouting } from './medicamentos-routing.module';
import { AddMedicamentoComponent } from './components/add-medicamento/add-medicamento.component';
import { ListaMedicamentosComponent } from './components/lista-medicamentos/lista-medicamentos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BarcodeScannerComponent } from './components/barcode-scanner-component/barcode-scanner-component.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AddMedicamentoGeneralComponent } from './components/add-medicamento-general/add-medicamento-general.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';




@NgModule({
  declarations: [
    MedicamentosComponent,
    AddMedicamentoComponent,
    ListaMedicamentosComponent,
   BarcodeScannerComponent,
   AddMedicamentoGeneralComponent,
   SearchBarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    medicamentosrouting,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  exports:[
    MedicamentosComponent
  ]
})
export class MedicamentosModule { }
