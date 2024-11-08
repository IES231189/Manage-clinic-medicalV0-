import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthServiceService) {}

  login() {
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (response: any) => {
        // Verifica si el token está presente en la respuesta
        const token = response.token;
        if (typeof token === 'string') {
          localStorage.setItem('token', token);
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
