import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {
  private apiUrl = 'tu_api_url/aqui';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }




  login(credentials: { username: string; password: string }): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/login`, credentials).pipe(
      tap((token: string) => {
        localStorage.setItem('token', token);
      })
    );
  }


  isTokenExpired(): boolean {
    const token = localStorage.getItem('token');
    return token ? this.jwtHelper.isTokenExpired(token) : true;
  }


  getRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const decodeToken = this.jwtHelper.decodeToken(token);
    return decodeToken ? decodeToken.role : null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  isUser(): boolean {
    return this.getRole() === 'user';
  }

  getUsername(): string | null {
    return 'nombre_usuario';
  }



}
