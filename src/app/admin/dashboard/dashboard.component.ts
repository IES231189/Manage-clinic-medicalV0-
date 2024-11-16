import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  isChildRoute = false;

  constructor(private router:Router , private route:ActivatedRoute ){
   this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.isChildRoute = currentRoute !== '/admin/dashboard';
    })
  }


  cards = [
    { nombre: 'Recetario', icono: '../../../assets/recetario.png', ruta: '/dashboard/recetario' },
    { nombre: 'Consultas', icono: '../../../assets/historial_consulta.png', ruta: '/admin/dashboard/consultas' },
    { nombre: 'Medicamentos', icono: '../../../assets/Medicamentos.png', ruta: '/admin/dashboard/medicamentos' },
    { nombre: 'Agenda', icono: '../../../assets/Citas.png', ruta: 'admin/citas' },
    { nombre: 'Camillas', icono: '../../../assets/camillas.png', ruta: '/camillas' },
    { nombre: 'Usuarios', icono: '../../../assets/Usuarios.png', ruta: '/usuarios' }
  ]

  navigateTo(ruta:string){
    this.router.navigate([ruta])
  }





}
