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
  private eliminarUsuario = 'http://localhost:5000/usuarios/users'; // Endpoint para eliminar usuario
  private editarUsuario = 'http://localhost:5000/usuarios/edit'; // Endpoint para editar usuario


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


  // Método para eliminar un usuario
  eliminarUsuarioPorId(id_user: number): Observable<any> {
    return this.http.delete<any>(`${this.eliminarUsuario}/${id_user}`);
  }

  // Método para actualizar un usuario
  editarUsuarioPorId(id_user: number, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.editarUsuario}/${id_user}`, updatedData);
  }
}





