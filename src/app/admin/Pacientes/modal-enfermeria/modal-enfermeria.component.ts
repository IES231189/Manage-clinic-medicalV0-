import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HospitalizacionService } from '../services/pacientes.service';

@Component({
  selector: 'app-hoja-enfermeria-modal',
  templateUrl: './modal-enfermeria.component.html',
  styleUrls: ['./modal-enfermeria.component.css']
})
export class HojaEnfermeriaModalComponent {
  @Input() paciente: any;
  @Output() close = new EventEmitter<void>();

  hojaEnfermeria: any = null; 
  isLoading = true;

  constructor(private hojaService: HospitalizacionService) {}

  ngOnInit(): void {
    if (this.paciente) {
      this.cargarHojaEnfermeria();
    }
  }

  cargarHojaEnfermeria(): void {
    this.isLoading = true;
    this.hojaService.getHospitalizacionesPorNombre(this.paciente.nombre).subscribe(
      (data) => {
        this.hojaEnfermeria = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar la hoja de enfermería:', error);
        this.isLoading = false;
        alert('No se encontraron datos...');
      }
    );
  }
  
  onClose(): void {
    this.close.emit();
  }


  printHojaEnfermeria(): void {
    const printContent = document.getElementById('hoja-enfermeria-content')?.innerHTML;
    const newWindow = window.open('', '', 'width=800, height=600');

    // Aquí se insertan los estilos CSS directamente en el contenido de impresión
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
            /* Puedes agregar más estilos aquí para personalizar la impresión */
          </style>
        </head>
        <body>
          ${printContent || ''}
        </body>
      </html>
    `);

    newWindow?.document.close();
    newWindow?.print();
  }

}
