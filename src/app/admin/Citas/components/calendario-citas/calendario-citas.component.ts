import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { ServicesService } from '../../services/services.service';
import { Calendario } from '../model/calendario';
@Component({
  selector: 'app-calendario-citas',
  templateUrl: './calendario-citas.component.html',
  styleUrls: ['./calendario-citas.component.css']
})
export class CalendarioCitasComponent implements OnInit {
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
    events: [], // Inicialmente vacío, se cargará desde el backend
    eventContent: this.renderEventContent.bind(this),
    dateClick: (info) => this.openModal(info),
    eventClick: (info) => this.editEvent(info),
  };

  selectedDate: string = '';
  selectedTime: any = '';
  showModal: boolean = false;
  selectedEvent: any = null;

  constructor(private service: ServicesService) {}

  ngOnInit(): void {
    this.fetchEvents(); // Carga los eventos al inicializar el componente
  }

  // Renderiza el contenido de un evento
  renderEventContent(eventInfo: any) {
    return {
      html: `<div style="border-left: 5px solid ${eventInfo.event.backgroundColor}; padding: 5px;">
                <div><strong>${eventInfo.event.title}</strong></div>
                <div>Paciente: ${eventInfo.event.extendedProps.paciente}</div>
                <div>${eventInfo.timeText}</div>
             </div>`
    };
  }

  // Abre el modal para crear o editar eventos
  openModal(info: any) {
    this.selectedDate = info.dateStr;
    this.selectedTime = info.date;
    this.showModal = true;
    this.selectedEvent = null;
  }

  // Edita un evento existente
  editEvent(info: any) {
    this.selectedEvent = info.event; // Guarda el evento seleccionado
    this.selectedDate = info.event.start.toISOString().split('T')[0];
    this.selectedTime = info.event.start;
    this.showModal = true;
  }

  // Llama al servicio para guardar o actualizar una cita
  onAppointmentSubmitted(appointmentData: Calendario) {
    const startDate = new Date(this.selectedDate);
    const endDate = new Date(startDate);
    endDate.setMinutes(startDate.getMinutes() + 30); // Duración de 30 minutos

    const nuevaCita = {
      ...appointmentData,
      start: startDate.toISOString(),
      end: endDate.toISOString()
    };

    if (this.selectedEvent) {
      // Actualizar evento existente
      this.service.guardarCita(nuevaCita).subscribe({
        next: () => {
          this.selectedEvent.setProp('title', `${appointmentData.nombre} ${appointmentData.apellidos}`);
          this.selectedEvent.setExtendedProp('paciente', `${appointmentData.nombre} ${appointmentData.apellidos}`);
          this.showModal = false;
        },
        error: (err) => console.error('Error al actualizar cita:', err)
      });
    } else {
      // Crear un nuevo evento
      this.service.guardarCita(nuevaCita).subscribe({
        next: () => {
          this.fetchEvents(); // Recarga los eventos desde el servidor
          this.showModal = false;
        },
        error: (err) => console.error('Error al guardar cita:', err)
      });
    }
  }

  // Cierra el modal
  closeModal() {
    this.showModal = false;
  }

  // Elimina un evento seleccionado
  deleteEvent() {
    if (this.selectedEvent) {
      const idEvento = this.selectedEvent.id; // Asume que cada evento tiene un ID único
      this.service.eliminarCita(idEvento).subscribe({
        next: () => {
          this.selectedEvent.remove(); // Elimina el evento del calendario
          this.selectedEvent = null;
          this.showModal = false;
        },
        error: (err) => console.error('Error al eliminar cita:', err)
      });
    } else {
      alert('No hay evento seleccionado para eliminar.');
    }
  }

  // Obtiene todos los eventos desde el backend y los carga en el calendario
  fetchEvents() {
    this.service.obtenerCitas().subscribe({
      next: (citas: Calendario[]) => {
        this.calendarOptions.events = citas.map((cita) => ({
          title: `${cita.nombre} ${cita.apellidos}`,
          start: cita.start,
          end: cita.end,
          color: '#4CAF50',
          extendedProps: { paciente: `${cita.nombre} ${cita.apellidos}`, num_tel: cita.num_tel }
        }));
      },
      error: (err) => console.error('Error al obtener citas:', err)
    });
  }
}
