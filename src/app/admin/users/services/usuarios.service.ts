import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , of } from 'rxjs';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private crearUsuarios = 'http://localhost:5000/usuarios/users';
  private OptenerUsuarios = 'http://localhost:5000/usuarios/profile';


  constructor( private http:HttpClient) { }

  crearUsuario(enfermeraData: any): Observable<any> {

    return this.http.post<any>(this.crearUsuarios, enfermeraData);
  }

  mostrarUsuario(): Observable<any[]> {
    return this.http.get<any[]>(this.OptenerUsuarios).pipe(
      catchError(error => {
        console.error('Error al obtener usuarios:', error);
        return of([]);  // Si ocurre un error, devuelve un array vacío
      })
    );
  }



}
