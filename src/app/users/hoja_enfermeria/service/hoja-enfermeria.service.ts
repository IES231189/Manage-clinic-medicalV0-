import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HospitalizacionService {

  private apiUrl = 'http://52.203.29.27/hospitalizacion';

  constructor(private http: HttpClient) {}

  // Obtener todas las hospitalizaciones
  getHospitalizaciones(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/add-hosts`);
  }

  // Obtener hospitalización por nombre del paciente
  getHospitalizacionesPorNombre(nombrePaciente: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/view-host/${nombrePaciente}`);
  }

  // Agregar una nueva hospitalización
  addHospitalizacion(hospitalizacion: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add-host`, hospitalizacion);
  }
}

