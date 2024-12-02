import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Calendario} from '../components/model/calendario'
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://52.203.29.27/calendario/add'; // URL de tu API


  // Método para agregar o actualizar una cita
  guardarCita(cita: Calendario): Observable<Calendario> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token no encontrado');
    }


    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // El token debe ir en el encabezado 'Authorization'
      'Content-Type': 'application/json'  // El tipo de contenido para enviar JSON
    });
    // Verifica si la cita ya existe (por ejemplo, si ya hay una cita a esa hora para ese paciente)
    return this.http.post<Calendario>(this.apiUrl, cita,{headers});
  }


  obtenerCitas(): Observable<Calendario[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token no encontrado');
    }


    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // El token debe ir en el encabezado 'Authorization'
      'Content-Type': 'application/json'  // El tipo de contenido para enviar JSON
    });
    return this.http.get<Calendario[]>('http://localhost:3000/calendario/get',{headers});
  }


  // Método para eliminar una cita
  eliminarCita(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
