import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {
  private apiUrl = 'http://localhost:5000/usuarios';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }


  // login(credentials: { email: string; contra: string }): Observable<string> {
  //   return this.http.post<string>(`${this.apiUrl}/login`, credentials).pipe(
  //     tap((token: string) => {
  //       localStorage.setItem('token', token);

  //     })
  //   );
  // }

    login(credentials: { email: string; contra: string }): Observable<{ token: string; rol: string; nombre : string }> {
    return this.http.post<{ mensaje: string; token: string; rol: string; nombre : string }>(
      `${this.apiUrl}/login`,
      credentials
    ).pipe(
      tap((response: { mensaje: string; token: string; rol: string; nombre : string }) => {

        localStorage.setItem('token', response.token);
        localStorage.setItem('rol', response.rol);
        localStorage.setItem('nombre',response.nombre)
      })
    );
  }


  isTokenExpired(): boolean {
    const token = localStorage.getItem('token');
    return token ? this.jwtHelper.isTokenExpired(token) : true;
  }



  getRole(): string | null {
    // const token = localStorage.getItem('token');
    // if (!token) return null;

    // const decodeToken = this.jwtHelper.decodeToken(token);
    // return decodeToken ? decodeToken.role : null;
    return localStorage.getItem('rol');
  }




  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  isUser(): boolean {
    return this.getRole() === 'enfermero';
  }

  getUsername(): string | null {
    return localStorage.getItem('nombre');
  }



}
