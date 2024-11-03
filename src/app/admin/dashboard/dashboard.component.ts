import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private router:Router){}

  cards = [
    { nombre: 'Recetario', icono: '../../../assets/recetario.png', ruta: '/recetario' },
    { nombre: 'Historial de Consultas', icono: '../../../assets/historial_consulta.png', ruta: '/historial-consultas' },
    { nombre: 'Medicamentos', icono: '../../../assets/Medicamentos.png', ruta: '/medicamentos' },
    { nombre: 'Agenda', icono: '../../../assets/Citas.png', ruta: '/agenda' },
    { nombre: 'Camillas', icono: '../../../assets/camillas.png', ruta: '/camillas' },
    { nombre: 'Usuarios', icono: '../../../assets/Usuarios.png', ruta: '/usuarios' }
  ]

  navigateTo(ruta:string){
    this.router.navigate([ruta])
  }


}
