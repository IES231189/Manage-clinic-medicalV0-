import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HojaEnfermeriaService {

  constructor(private http: HttpClient) {}

  getHojasPorPaciente(pacienteId: number): Observable<any> {
    return this.http.get<any>(`/api/hoja-enfermeria/${pacienteId}`);
  }
}
