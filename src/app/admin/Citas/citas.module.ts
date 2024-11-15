import { NgModule  , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { CalendarioCitasComponent } from './components/calendario-citas/calendario-citas.component';
import { FullCalendarModule } from '@fullcalendar/angular';



@NgModule({
  declarations: [
    
    CalendarioCitasComponent
  ],
  imports: [
    CommonModule ,
    FormsModule,
   FullCalendarModule
  ] ,
  exports:[
    CalendarioCitasComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CitasModule { }
