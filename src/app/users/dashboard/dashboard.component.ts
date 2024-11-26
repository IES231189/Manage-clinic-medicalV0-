import { Component } from '@angular/core';
import { Router,Route , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class UsersDashboardComponent {
  nombre = localStorage.getItem('nombre')
  isChildRoute = false;

  constructor(private router:Router , private route:ActivatedRoute ){
   this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.isChildRoute = currentRoute !== '/admin/dashboard';
    })
  }


  cards = [
    { nombre: 'Pacientes', icono: '../../../assets/recetario.png', ruta: 'user/Pacientes' },
    { nombre: 'Medicamentos', icono: '../../../assets/Medicamentos.png', ruta: 'user/medicamentos' }

  ]

  navigateTo(ruta:string){
    this.router.navigate([ruta])
  }

}
