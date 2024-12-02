import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent {
  email: string = '';
  contra: string = '';

  constructor(private authService: AuthServiceService, private router : Router) {}

  rol:String = ""

  login() {
    this.authService.login({ email: this.email, contra: this.contra }).subscribe({
      next: (response: any) => {
        // Verifica si el token está presente en la respuesta
        const token = response.token;
        this.rol = response.rol
        console.log(this.rol);

        if ( this.rol == "admin") {
          localStorage.setItem('token', token);
          this.router.navigate(['/admin'])
        } else if(this.rol == "enfermero"){
          localStorage.setItem('token', token);
          console.log("no sirve la ruta xd");

          this.router.navigate(['/user'])
        }
      },

      error: (error) => {
        console.error('Error en la autenticación:', error);
      },
      complete: () => {
        console.log('Proceso de login completado');
      }
    });
  }
}
