import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponentComponent } from './components/login-component/login-component.component';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    LoginComponentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['yourdomain.com'], // Ajusta tu dominio aquí
        disallowedRoutes: ['http://example.com/examplebadroute/'], // Ajusta las rutas que deseas bloquear
      },
    })
  ],
  exports : [
    LoginComponentComponent
  ]
})
export class AuthModule { }
