import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HospitalizacionService {

  private apiUrl = 'http://localhost:3000/hospitalizacion'; 

  constructor(private http: HttpClient) {}

  
  getHospitalizaciones(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/view-hosts`);
  }

  
  getHospitalizacionesPorNombre(nombrePaciente: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/view-host/${nombrePaciente}`);
  }

  
  addHospitalizacion(hospitalizacion: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add-host`, hospitalizacion);
  }
}
