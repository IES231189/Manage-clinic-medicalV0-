import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consulta } from '../models/consulta';

@Injectable({
  providedIn: 'root',
})
export class ConsultaService {


  private apiUrl = 'http://52.203.29.27/consults';

  constructor(private http: HttpClient) {}


  // Headers con Token JWT (si aplica)

  // Mostrar todas las consultas
  getConsultas(): Observable<Consulta[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token no encontrado');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // El token debe ir en el encabezado 'Authorization'
      'Content-Type': 'application/json'  // El tipo de contenido para enviar JSON
    });
    return this.http.get<Consulta[]>(`${this.apiUrl}/view-consults`,{headers});
  }

  // Buscar consulta por nombre
  getConsultaByNombre(nombre: string): Observable<Consulta> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token no encontrado');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // El token debe ir en el encabezado 'Authorization'
      'Content-Type': 'application/json'  // El tipo de contenido para enviar JSON
    });
    return this.http.get<Consulta>(`${this.apiUrl}/view-consult/${nombre}`,{headers});
  }

  // Crear una nueva consulta
  createConsulta(consulta: Consulta): Observable<Consulta> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token no encontrado');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // El token debe ir en el encabezado 'Authorization'
      'Content-Type': 'application/json'  // El tipo de contenido para enviar JSON
    });

    return this.http.post<Consulta>(`http://52.203.29.27/consults/add-consult`,consulta,{headers});
  }

  // Actualizar una consulta existente
  updateConsulta(id: string, consulta: Consulta): Observable<Consulta> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token no encontrado');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // El token debe ir en el encabezado 'Authorization'
      'Content-Type': 'application/json'  // El tipo de contenido para enviar JSON
    });
    return this.http.put<Consulta>(`http://52.203.29.27/consults/edit-consult/${id}`, consulta,{headers});
  }

  // Eliminar una consulta por su ID
  deleteConsulta(id: string): Observable<void> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token no encontrado');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // El token debe ir en el encabezado 'Authorization'
      'Content-Type': 'application/json'  // El tipo de contenido para enviar JSON
    });
    return this.http.delete<void>(`http://52.203.29.27/consults/delete-consult/${id}`,{headers});

  }
}
