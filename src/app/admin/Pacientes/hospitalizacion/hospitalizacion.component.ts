import { Component, OnInit } from '@angular/core';
import { HojaEnfermeriaService } from '../services/pacientes.service';
import { HojaEnfermeria } from '../models/hoja-enfermeria';

type TextColumn = { name: string, type: 'text' | 'number', key: string };
type ButtonColumn = { name: string, type: 'button', action: string };

@Component({
  selector: 'app-hospitalizacion',
  templateUrl: './hospitalizacion.component.html',
  styleUrls: ['./hospitalizacion.component.css']
})
export class HospitalizacionComponent implements OnInit {
  data:any = [];
  selectedPaciente: any = null;
  showHojaModal = false;

  columns: (TextColumn | ButtonColumn)[] = [
    { name: 'Nombre', type: 'text', key: 'nombre' },
    { name: 'Edad', type: 'number', key: 'edad' },
    { name: 'Habitación', type: 'text', key: 'habitacion' },
    { name: 'Hoja de Enfermería', type: 'button', action: 'openHoja' }
  ];

  constructor(private hojaEnfermeriaService: HojaEnfermeriaService) {}

  ngOnInit(): void {
    this.cargarPacientes();
    //aqui
  }

/*
  cargarPacientes(): void {
    // Llamada al servicio para obtener los pacientes desde la API
    this.hojaEnfermeriaService.getPacientes().subscribe(
      (pacientes) => {
        this.data = pacientes; // Asigna los pacientes obtenidos al array de datos
      },
      (error) => {
        console.error('Error al cargar los pacientes', error);
      }
    );
  }*/

//datos de amentiris
  cargarPacientes(): void {
    this.data = [
      { id: 1, nombre: 'Juan Pérez', edad: 45, habitacion: '101' },
      { id: 2, nombre: 'Ana Gómez', edad: 37, habitacion: '102' },
      { id: 3, nombre: 'Carlos Ramírez', edad: 50, habitacion: '103' }
    ];
  }

  onOpenHoja(paciente: any): void {
    this.selectedPaciente = paciente;
    this.showHojaModal = true;
  }

  onCloseModal(): void {
    this.showHojaModal = false;
    this.selectedPaciente = null;
  }
}
