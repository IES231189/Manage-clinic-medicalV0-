import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalCitasComponent } from './components/modal-citas/modal-citas.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';



@NgModule({
  declarations: [
    ModalCitasComponent
  ],
  imports: [
    CommonModule ,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ]
})
export class CitasModule { }
