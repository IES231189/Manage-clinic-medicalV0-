import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consulta } from '../models/consulta';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {


  private apiUrl = 'http://localhost:3000/consults';

  constructor(private http: HttpClient) {}

  // Mostrar todas las consultas
  getConsultas(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(`${this.apiUrl}/view-consults`);
  }

  // Crear nueva consulta
  createConsulta(consulta: Consulta): Observable<Consulta> {
    return this.http.post<Consulta>(`${this.apiUrl}/add-consult`, consulta);
  }

  // Actualizar una consulta
  updateConsulta(consulta: Consulta): Observable<Consulta> {
    return this.http.put<Consulta>(`${this.apiUrl}/edit-consult/${consulta.id}`, consulta);
  }

  // Eliminar consulta por ID
  deleteConsulta(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-consult/${id}`);
  }

  // Obtener consulta por nombre (requiere autenticación)
  getConsultaByName(nombre: string, token: string): Observable<Consulta> {
    const headers = { Authorization: `Bearer ${token}` }; 
    return this.http.get<Consulta>(`${this.apiUrl}/view-consult/${nombre}`, { headers });
  }
}
