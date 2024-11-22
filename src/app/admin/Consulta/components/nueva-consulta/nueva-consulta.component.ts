import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Consulta } from '../../models/consulta';
import { ConsultaService } from '../../Services/consulta.service';
import { v4 as uuidv4 } from 'uuid'; 

@Component({
  selector: 'app-nueva-consulta',
  templateUrl: './nueva-consulta.component.html',
  styleUrls: ['./nueva-consulta.component.css']
})
export class NuevaConsultaComponent {
  showModal: boolean = true;
  consulta: Consulta = {
    id: '', 
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

  constructor(private router: Router, private consultaService: ConsultaService) {}

  closeModal() {
    this.showModal = false;
  }

  guardarConsulta() {
    // Generar un ID único antes de guardar
    this.consulta.id = uuidv4();

    console.log('Consulta con ID generado:', this.consulta);

    // Llamar al servicio para enviar los datos a la API
    this.consultaService.createConsulta(this.consulta).subscribe(
      (response) => {
        console.log('Consulta guardada correctamente:', response);
        // Redirigir al usuario si es necesario
        // this.router.navigate(['/admin/dashboard/consultas']);
      },
      (error) => {
        console.error('Error al guardar la consulta:', error);
      }
    );

    this.closeModal();
  }
}
