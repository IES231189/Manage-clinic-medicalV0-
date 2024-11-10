import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Consulta } from '../../models/consulta';

@Component({
  selector: 'app-nueva-consulta',
  templateUrl: './nueva-consulta.component.html',
  styleUrl: './nueva-consulta.component.css'
})
export class NuevaConsultaComponent {
  showModal: boolean = true;
  consulta: Consulta = {
    nombrePaciente: '',
    edad: 0,
    alergias: '',
    nombreMedico: '',
    idx: '',
    dieta: '',
    medicamento: '',
    medidasGenerales: '',
    fecha: new Date()
  };

  constructor(private router: Router) {}

  closeModal() {
    this.showModal = false;
  }

  guardarConsulta() {
    console.log('Consulta guardada:', this.consulta);

    // Lógica para guardar los datos (puedes agregar llamada a servicio aquí)

    // Después de guardar, redirigir a otra ruta
    this.router.navigate(['/admin/dashboard/consultas']); // Cambia '/ruta-destino' por la ruta a la que quieras redirigir

    this.closeModal();
  }
}
