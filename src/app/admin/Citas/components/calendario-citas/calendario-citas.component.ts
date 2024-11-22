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

  calendarEvents = [
    {
      title: 'Cita General',
      start: '2024-05-13T09:00:00',
      end: '2024-05-13T10:00:00',
      color: '#4CAF50',
      extendedProps: { paciente: 'Alejandro Gomez' }
    },
    {
      title: 'Control de Embarazo',
      start: '2024-05-14T13:00:00',
      end: '2024-05-14T14:00:00',
      color: '#FF5722',
      extendedProps: { paciente: 'Nayeli Nucamendi' }
    }
  ];

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    locale: esLocale,
    editable: true,
    slotDuration: '00:10:00',
    slotMinTime: '08:00:00',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: this.calendarEvents,
    eventContent: this.renderEventContent,
    dateClick: (info) => this.openModal(info),
    eventClick: (info) => this.editEvent(info),
  };


  selectedDate: string = '';
  selectedTime: any = '';
  showModal: boolean = false;
  selectedEvent: any = null;

  renderEventContent(eventInfo: any) {
    return {
      html: `<div style="border-left: 5px solid ${eventInfo.event.backgroundColor}; padding: 5px;">
                <div><strong>${eventInfo.event.title}</strong></div>
                <div>Paciente: ${eventInfo.event.extendedProps.paciente}</div>
                <div>${eventInfo.timeText}</div>
             </div>`
    };
  }


  openModal(info: any) {
    this.selectedDate = info.dateStr;
    this.selectedTime = info.date;
    this.showModal = true;
    this.selectedEvent = null;

  }

  editEvent(info: any) {
    this.selectedEvent = info.event; // Guarda el evento seleccionado
    this.selectedDate = info.event.start.toISOString().split('T')[0];
    this.selectedTime = info.event.start;
    this.showModal = true;
  }


  onAppointmentSubmitted(appointmentData: { patientName: string }) {
    if (this.selectedEvent) {
      // Actualizar evento existente
      this.selectedEvent.setProp('title', 'Cita General');
      this.selectedEvent.setExtendedProp('paciente', appointmentData.patientName);
    } else {
      // Crear un nuevo evento
      const startDate = new Date(this.selectedDate);
      const endDate = new Date(startDate);
      endDate.setHours(startDate.getHours() + 1);

      const newEvent = {
        title: 'Cita General',
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        color: '#4CAF50',
        extendedProps: { paciente: appointmentData.patientName }
      };

      const currentEvents = Array.isArray(this.calendarOptions.events)
        ? this.calendarOptions.events
        : [];
      this.calendarOptions.events = [...currentEvents, newEvent];
    }

    this.showModal = false;
  }

  closeModal(){
    this.showModal = false;
  }


  deleteEvent() {
    if (this.selectedEvent) {
      this.selectedEvent.remove(); // Elimina el evento seleccionado del calendario
      this.selectedEvent = null;
      this.showModal = false; // Cierra el modal
    } else {
      alert('No hay evento seleccionado para eliminar.');
    }
  }

}
