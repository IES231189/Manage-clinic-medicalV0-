import { Component , Input , Output , EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-agenda',
  templateUrl: './modal-agenda.component.html',
  styleUrl: './modal-agenda.component.css'
})
export class ModalAgendaComponent {
  @Input() selectedDate: string = '';
  @Input() selectedTime: any = '';
  @Output() appointmentSubmitted = new EventEmitter<{ patientName: string }>();
  @Output() modalClosed = new EventEmitter<void>();
  @Output() eventDeleted = new EventEmitter<void>();
  patientName: string = '';



deleteEvent() {
  this.eventDeleted.emit();
  this.closeModal();
}


  submitAppointment() {
   if (this.patientName.trim() === '') {
    alert('Por favor, ingrese el nombre del paciente.'); 
    return;
  }
  this.appointmentSubmitted.emit({ patientName: this.patientName });
  this.patientName = '';

  }

  closeModal() {
    this.patientName = '';
    this.modalClosed.emit();
  }



}
