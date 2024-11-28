import { Component, OnInit } from '@angular/core';
import { HospitalizacionService } from '../services/pacientes.service';
import { HojaEnfermeria } from '../models/hoja-enfermeria';

type TextColumn = { name: string, type: 'text' | 'number', key: string };
type ButtonColumn = { name: string, type: 'button', action: string };

@Component({
  selector: 'app-hospitalizacion',
  templateUrl: './hospitalizacion.component.html',
  styleUrls: ['./hospitalizacion.component.css']
})
export class HospitalizacionComponent implements OnInit {
  data: any = {}; 
  selectedPaciente: any = null;
  showHojaModal = false;
  hojaEnfermeria: HojaEnfermeria | null = null;

  columns: (TextColumn | ButtonColumn)[] = [
    { name: 'Nombre del Paciente', type: 'text', key: 'nombrePaciente' },
    { name: 'Número de Camilla', type: 'text', key: 'numeroCamilla' },
    { name: 'Hoja de Enfermería', type: 'button', action: 'openHoja' }
  ];

  constructor(private hospitalizacionService: HospitalizacionService) {}

  ngOnInit(): void {
    this.cargarPacientes();
  }

  // Llamada al servicio para cargar los pacientes
  cargarPacientes(): void {
    this.hospitalizacionService.getHospitalizaciones().subscribe(
      (data) => {
        console.log('Datos recibidos de la API:', data); // Verifica la estructura exacta de los datos

        // Si data es un objeto, lo asignamos a 'data'
        if (data && typeof data === 'object') {
          this.data = data;
        } else {
          console.error('Error: La respuesta de la API no es un objeto válido');
          this.data = {}; // Si no es un objeto válido, asignamos un objeto vacío
        }
      },
      (error) => {
        console.error('Error al cargar los pacientes', error);
        this.data = {}; // Asignamos un objeto vacío si ocurre un error
      }
    );
  }

  // Método para abrir el modal de la hoja de enfermería
  onOpenHoja(paciente: any): void {
    this.selectedPaciente = paciente;
    this.showHojaModal = true;

    console.log('Paciente seleccionado:', this.selectedPaciente); // Verifica el paciente seleccionado

    // Llamada al servicio para obtener la hoja de enfermería usando el nombrePaciente
    const nombrePaciente = this.selectedPaciente?.nombrePaciente;
    console.log('Nombre del paciente para hoja:', nombrePaciente); // Depuración

    if (nombrePaciente) {
      this.hospitalizacionService.getHospitalizacionesPorNombre(nombrePaciente).subscribe(
        (data) => {
          this.hojaEnfermeria = data;
        },
        (error) => {
          console.error('Error al cargar la hoja de enfermería', error);
          alert('Error al obtener los datos de la hoja de enfermería.');
        }
      );
    } else {
      console.error('No se encontró el nombre del paciente');
      alert('El paciente no tiene un nombre válido.');
    }
  }

  onCloseModal(): void {
    this.showHojaModal = false;
    this.selectedPaciente = null;
    this.hojaEnfermeria = null;
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
