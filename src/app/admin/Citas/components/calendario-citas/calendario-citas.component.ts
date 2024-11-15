import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-calendario-citas',
  templateUrl: './calendario-citas.component.html',
  styleUrls: ['./calendario-citas.component.css']
})
export class CalendarioCitasComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    locale: esLocale,
    editable: true,
    slotDuration: '00:30:00',
    slotMinTime: '08:00:00',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: [
      { title: 'Cita General', start: '2024-05-13T09:00:00', end: '2024-05-13T10:00:00', color: '#4CAF50', extendedProps: { paciente: 'Alejandro Gomez' } },
      { title: 'Control de Embarazo', start: '2024-05-14T13:00:00', end: '2024-05-14T14:00:00', color: '#FF5722', extendedProps: { paciente: 'Nayeli Nucamendi' } },
      { title: 'Cita General', start: '2024-05-15T15:00:00', end: '2024-05-15T16:00:00', color: '#FFC107', extendedProps: { paciente: 'Raul Gomez' } },
      { title: 'Control de Embarazo', start: '2024-11-15T10:00:00', end: '2024-11-15T10:40:00', color: '#FF9800', extendedProps: { paciente: 'Andrea Lopez' } },
      { title: 'Cita de Seguimiento', start: '2024-11-15T10:00:00', end: '2024-11-15T11:00:00', color: '#2196F3', extendedProps: { paciente: 'Luis Pérez' } }
    ],
    eventContent: this.renderEventContent // Función para personalizar el contenido del evento
  };

  renderEventContent(eventInfo: any) {
    return {
      html: `<div style="border-left: 5px solid ${eventInfo.event.backgroundColor}; padding: 5px;">
                <div><strong>${eventInfo.event.title}</strong></div>
                <div>Paciente: ${eventInfo.event.extendedProps.paciente}</div>
                <div>${eventInfo.timeText}</div>
             </div>`
    };
  }
}
