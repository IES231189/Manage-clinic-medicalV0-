import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consulta } from '../models/consulta';

@Injectable({
  providedIn: 'root',
})
export class ConsultaService {
  private apiUrl = 'http://localhost:3000/consults';
 

  constructor(private http: HttpClient) {}

  // Headers con Token JWT (si aplica)
  private getHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`, // JWT guardado en localStorage
      }),
    };
  }

  // Mostrar todas las consultas
  getConsultas(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(`${this.apiUrl}/view-consults`);
  }

  // Buscar consulta por nombre
  getConsultaByNombre(nombre: string): Observable<Consulta> {
    return this.http.get<Consulta>(`${this.apiUrl}/view-consult/${nombre}`, this.getHeaders());
  }

  // Crear una nueva consulta
  createConsulta(consulta: Consulta): Observable<Consulta> {
    return this.http.post<any>(`http://localhost:3000/consults/add-consult`,consulta);
  }

  // Actualizar una consulta existente
  updateConsulta(id: string, consulta: Consulta): Observable<Consulta> {
    return this.http.put<Consulta>(`http://localhost:3000/consults/edit-consult/${id}`, consulta, this.getHeaders());
  }

  // Eliminar una consulta por su ID
  deleteConsulta(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/consults/delete-consult/${id}`, this.getHeaders());
  }
}
