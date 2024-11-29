import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { Calendario } from '../model/calendario';

@Component({
  selector: 'app-modal-agenda',
  templateUrl: './modal-agenda.component.html',
  styleUrls: ['./modal-agenda.component.css']
})
export class ModalAgendaComponent implements OnInit {
  @Input() selectedDate: string = '';
  @Input() selectedTime: any = '';
  @Output() appointmentSubmitted = new EventEmitter<Calendario>();
  @Output() modalClosed = new EventEmitter<void>();
  @Output() eventDeleted = new EventEmitter<void>();

  patientName: string = '';
  patientLastName: string = '';
  patientPhone: number = 0;

  constructor(private citaService: ServicesService) {}

  ngOnInit() {}

  // Calcula la hora de finalización (30 minutos después de la hora seleccionada)
  calculateEndTime(start: string): string {
    const startDate = new Date(start);
    startDate.setMinutes(startDate.getMinutes() + 30); // Incrementa 30 minutos
    return startDate.toISOString();
  }

  submitAppointment() {
    if (this.patientName.trim() === '' || this.patientLastName.trim() === '' || this.patientPhone === 0) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    if (!this.isValidDate()) {
      alert('No se puede agendar una cita en un día anterior al actual.');
      return;
    }

    // Crear el objeto Calendario con los datos ingresados
    const newAppointment: Calendario = {
      nombre: this.patientName,
      apellidos: this.patientLastName,
      num_tel: this.patientPhone,
      start: new Date(this.selectedDate).toISOString(), // Fecha y hora de inicio
      end: this.calculateEndTime(this.selectedDate), // Fecha y hora de finalización
      color: '#4CAF50' // Color predeterminado para las citas
    };

    // Emite el nuevo objeto al componente padre
    this.appointmentSubmitted.emit(newAppointment);

    // Reinicia los valores y cierra el modal
    this.resetForm();
  }

  resetForm() {
    this.patientName = '';
    this.patientLastName = '';
    this.patientPhone = 0;
    this.modalClosed.emit();
  }

  isValidDate(): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ignora las horas para comparar solo la fecha
    const selected = new Date(this.selectedDate);

    return selected >= today;
  }

  deleteEvent() {
    this.eventDeleted.emit();
    this.resetForm();
  }
}
