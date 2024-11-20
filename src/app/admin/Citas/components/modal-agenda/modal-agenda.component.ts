import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-agenda',
  templateUrl: './modal-agenda.component.html',
  styleUrls: ['./modal-agenda.component.css'] // Asegúrate de que el nombre sea "styleUrls"
})
export class ModalAgendaComponent {
  @Input() selectedDate: string = '';
  @Input() selectedTime: any = '';
  @Output() appointmentSubmitted = new EventEmitter<{ patientName: string }>();
  @Output() modalClosed = new EventEmitter<void>();

  patientName: string = '';

  submitAppointment() {
    if (this.patientName.trim() === '') {
      alert('Por favor, ingrese el nombre del paciente.'); // Validación simple
      return;
    }

    if (!this.isValidDate()) {
      alert('No se puede agendar una cita en un día anterior al actual.');
      return;
    }

    this.appointmentSubmitted.emit({ patientName: this.patientName });
    this.patientName = '';
  }

  closeModal() {
    this.patientName = '';
    this.modalClosed.emit();
  }

  /**
   * Valida si la fecha seleccionada es válida (no es anterior a la fecha actual).
   * @returns boolean
   */
  isValidDate(): boolean {
    const today = new Date(); 
    today.setHours(0, 0, 0, 0);
    const selected = new Date(this.selectedDate);

    return selected >= today;
  }
}
