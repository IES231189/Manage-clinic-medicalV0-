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
  @Output() appointmentSubmitted = new EventEmitter<{ patientName: string }>();
  @Output() modalClosed = new EventEmitter<void>();
  @Output() eventDeleted = new EventEmitter<void>();
  patientName: string = '';
  patientLastName: string = '';
  patientPhone: number = 0;

  calendario: Calendario = {
    nombre: '',
    apellidos: '',
    num_tel: 0
  };

  citas: Calendario[] = []; // Almacena todas las citas obtenidas de la API

  constructor(private citaService: ServicesService) {}

  ngOnInit() {
    this.getCitas(); // Obtiene las citas cuando se carga el componente
  }

  // Método para obtener todas las citas
  getCitas() {
    this.citaService.obtenerCitas().subscribe(
      (citas) => {
        this.citas = citas; // Asigna las citas obtenidas al array citas
        console.log('Citas obtenidas:', citas);
      },
      (error) => {
        console.error('Error al obtener las citas:', error);
      }
    );
  }


deleteEvent() {
  this.eventDeleted.emit();
  this.closeModal();
}


  submitAppointment() {
// <<<<<<< HEAD
//     if (this.patientName.trim() === '' || this.patientLastName.trim() === '' || this.patientPhone === 0) {
//       alert('Por favor, ingrese todos los datos del paciente.');
//       return;
//     }
// =======
   if (this.patientName.trim() === '') {
    alert('Por favor, ingrese el nombre del paciente.');
    return;
  }
  this.appointmentSubmitted.emit({ patientName: this.patientName });
  this.patientName = '';


    if (!this.isValidDate()) {
      alert('No se puede agendar una cita en un día anterior al actual.');
      return;
    }

    // Configura el objeto calendario con los datos del paciente
    this.calendario.nombre = this.patientName;
    this.calendario.apellidos = this.patientLastName;
    this.calendario.num_tel = this.patientPhone;

    // Guarda la cita en la API
    this.citaService.guardarCita(this.calendario).subscribe(response => {
      this.appointmentSubmitted.emit({ patientName: this.patientName });
      this.patientName = '';
      this.patientLastName = '';
      this.patientPhone = 0;
      this.getCitas(); // Vuelve a obtener las citas después de guardar una nueva
      console.log('Cita guardada exitosamente:', response);
    }, error => {
      console.error('Error al guardar la cita:', error);
    });
  }

  closeModal() {
    this.patientName = '';
    this.patientLastName = '';
    this.patientPhone = 0;
    this.modalClosed.emit();
  }

  isValidDate(): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(this.selectedDate);

    return selected >= today;
  }
}
