import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultaService } from '../../Services/consulta.service';  
import { Consulta } from '../../models/consulta';

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

  constructor(
    private router: Router,
    private consultaService: ConsultaService  
  ) {}

  closeModal() {
    this.showModal = false;
  }

  guardarConsulta() {
    if (!this.validarFormulario()) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    
    this.consultaService.createConsulta(this.consulta).subscribe(
      (response) => {
        console.log('Consulta guardada:', response);
        this.router.navigate(['/admin/dashboard/consultas']); 
        this.closeModal(); // Cerrar el modal
      },
      (error) => {
        console.error('Error al guardar la consulta:', error);
        alert('Hubo un error al guardar la consulta. Inténtalo nuevamente.');
      }
    );
  }

  validarFormulario(): boolean {
    const { nombrePaciente, edad, alergias, nombreMedico, idx, dieta, medicamento, medidasGenerales, fecha } = this.consulta;

    
    if (!nombrePaciente || !edad || !alergias || !nombreMedico || !idx || !dieta || !medicamento || !medidasGenerales || !fecha) {
      return false;
    }

    
    const nombreRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
    if (!nombreRegex.test(nombrePaciente)) {
      alert('El nombre del paciente solo debe contener letras.');
      return false;
    }

    
    if (edad <= 0) {
      alert('La edad debe ser un número mayor que 0.');
      return false;
    }

    return true;
  }
}


