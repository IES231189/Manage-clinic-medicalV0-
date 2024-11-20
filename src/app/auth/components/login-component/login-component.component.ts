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

  login() {
    this.authService.login({ email: this.email, contra: this.contra }).subscribe({
      next: (response: any) => {
        // Verifica si el token está presente en la respuesta
        const token = response.token;
        if (typeof token === 'string') {
          localStorage.setItem('token', token);
          this.router.navigate(['/admin'])
        } else {
          console.error('El token recibido no es un string:', token);
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
