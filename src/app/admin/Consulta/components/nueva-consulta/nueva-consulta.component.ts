import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultaService } from '../../Services/consulta.service';  
import { Consulta } from '../../models/consulta';
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

  constructor(
    private router: Router,
    private consultaService: ConsultaService  
  ) {}

  // Cerrar el modal
  closeModal() {
    this.showModal = false;
  }

  // Método para guardar la consulta
  guardarConsulta() {
    // Validar el formulario antes de guardar
    if (this.validarFormulario()) {
      // Generar un ID único antes de guardar
      this.consulta.id = uuidv4();

      console.log('Consulta con ID generado:', this.consulta);

      // Llamar al servicio para enviar los datos a la API
      this.consultaService.createConsulta(this.consulta).subscribe(
        (response) => {
          alert("Consulta guardada correctamente");
          this.router.navigate(['/admin/dashboard']);
        },
        (error) => {
          console.error('Error al guardar la consulta:', error);
        }
      );
      
      // Redirigir a la página de consultas
      this.router.navigate(['/admin/dashboard/consultas']);
    } else {
      console.log("Formulario no válido");
    }
  }

  // Función para validar el formulario
  validarFormulario(): boolean {
    const { nombrePaciente, edad, alergias, nombreMedico, idx, dieta, medicamento, medidasGenerales, fecha } = this.consulta;
    
    // Validaciones de campos requeridos
    if (!nombrePaciente || !edad || !alergias || !nombreMedico || !idx || !dieta || !medicamento || !medidasGenerales || !fecha) {
      alert('Todos los campos deben ser completados.');
      return false;
    }

    // Validar que el nombre del paciente solo contenga letras
    const nombreRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
    if (!nombreRegex.test(nombrePaciente)) {
      alert('El nombre del paciente solo debe contener letras.');
      return false;
    }

    // Validar que la edad sea mayor que 0
    if (edad <= 0) {
      alert('La edad debe ser un número mayor que 0.');
      return false;
    }

    return true;
  }
}

