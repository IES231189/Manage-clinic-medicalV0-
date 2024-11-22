import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , of } from 'rxjs';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private crearUsuarios = '';
  private OptenerUsuarios = '';


  constructor( private http:HttpClient) { }

  crearUsuario(enfermeraData: any): Observable<any> {
    return this.http.post<any>(this.crearUsuarios, enfermeraData);
  }

  mostrarUsuario(): Observable<any[]> {
    return this.http.get<any[]>(this.OptenerUsuarios).pipe(
      catchError(error => {
        console.error('Error al obtener medicamentos:', error);
        return of([]);
      })
    );
  }


}
