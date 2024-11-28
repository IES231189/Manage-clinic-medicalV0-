import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HospitalizacionService } from '../services/pacientes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hoja-enfermeria-modal',
  templateUrl: './modal-enfermeria.component.html',
  styleUrls: ['./modal-enfermeria.component.css']
})
export class HojaEnfermeriaModalComponent implements OnInit, OnChanges {
  @Input() paciente: any; // Paciente seleccionado
  @Input() hojaEnfermeria: any; // Hoja de enfermería seleccionada
  @Output() close = new EventEmitter<void>(); // Evento para cerrar el modal

  isLoading = false; // Indicador de carga
  errorMessage: string = ''; // Mensaje de error
  data: any[] = []; // Datos obtenidos
  subscription: Subscription | null = null; // Suscripción activa
  lastPaciente: any = null; // Último paciente procesado para evitar recargas innecesarias

  constructor(private hojaService: HospitalizacionService) {}

  ngOnInit(): void {
    console.log('Inicialización del componente. Paciente recibido:', this.paciente);
    if (this.paciente) {
      this.cargarHojaEnfermeria();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Cambios detectados en inputs:', changes);
    if (changes['paciente'] && changes['paciente'].currentValue) {
      const nuevoPaciente = changes['paciente'].currentValue;
      if (nuevoPaciente !== this.lastPaciente) {
        console.log('Nuevo paciente detectado. Cargando datos para:', nuevoPaciente);
        this.lastPaciente = nuevoPaciente; // Actualizar el paciente procesado
        this.cargarHojaEnfermeria();
      } else {
        console.log('El paciente no cambió. No se recargan los datos.');
      }
    }
  }

  cargarHojaEnfermeria(): void {
    if (this.isLoading) {
      console.warn('Carga en progreso. Evitando solicitud duplicada.');
      return; // Evitar solicitudes múltiples
    }

    const nombrePaciente = this.paciente?.nombrePaciente;
    if (!nombrePaciente) {
      console.error('Error: El paciente no tiene nombre.');
      this.errorMessage = 'No se ha proporcionado el nombre del paciente.';
      return;
    }

    console.log('Solicitando datos para el paciente:', nombrePaciente);

    this.isLoading = true; // Inicia la carga
    this.errorMessage = '';

    // Cancelar suscripciones anteriores
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    // Realizar la solicitud
    this.subscription = this.hojaService.getHospitalizacionesPorNombre(nombrePaciente).subscribe({
      next: (data) => {
        console.log('Datos recibidos del servicio:', data);

        // Validar datos recibidos
        if (Array.isArray(data) && data.length > 0) {
          this.data = data;
          this.hojaEnfermeria = data[0]; // Usar el primer resultado
          console.log('Hoja de enfermería asignada:', this.hojaEnfermeria);
        } else {
          console.warn('No se encontraron hojas de enfermería para el paciente:', nombrePaciente);
          this.errorMessage = 'No se encontraron hojas de enfermería para este paciente.';
        }

        this.isLoading = false; // Finaliza la carga
      },
      error: (err) => {
        console.error('Error en la solicitud al servicio:', err);
        this.errorMessage = 'Hubo un problema al cargar los datos. Intenta de nuevo más tarde.';
        this.isLoading = false; // Finaliza la carga
      }
    });
  }

  onClose(): void {
    console.log('Cerrando modal y limpiando recursos.');
    // Cancelar suscripciones activas al cerrar el modal
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
    this.close.emit(); // Emitir evento de cierre
  }

  printHojaEnfermeria(): void {
    const printContent = document.getElementById('hoja-enfermeria-content')?.innerHTML;
    if (!printContent) {
      console.error('Contenido de impresión no encontrado.');
      this.errorMessage = 'No se pudo encontrar el contenido de la hoja de enfermería para imprimir.';
      return;
    }

    console.log('Imprimiendo hoja de enfermería.');
    const newWindow = window.open('', '', 'width=800, height=600');
    newWindow?.document.write(`
      <html>
        <head>
          <title>Hoja de Enfermería</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              padding: 10px;
            }
            .container-title {
              display: flex;
              align-items: center;
            }
            .container-title h2 {
              margin: 0;
            }
            ul {
              padding-left: 20px;
            }
            ul li {
              margin-bottom: 5px;
            }
            .imprimir {
              display: none; /* Ocultar el botón de imprimir en la vista previa */
            }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    newWindow?.document.close();
    newWindow?.print();
  }
}
