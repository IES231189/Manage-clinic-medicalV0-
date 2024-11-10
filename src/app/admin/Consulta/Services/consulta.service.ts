import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consulta } from '../models/consulta';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  //crear nuevas rutas aqui  y sustituir en los metodos de abajo mostrados
  private apiUrl = 'https://your-api-url.com/consultas';



  constructor(private http: HttpClient) {}

  // mostrar consultas
  getConsultas(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(this.apiUrl);
  }

  // nueva consulta
  createConsulta(consulta: Consulta): Observable<Consulta> {
    return this.http.post<Consulta>(this.apiUrl, consulta);
  }

  // Actualizar
  updateConsulta(consulta: Consulta): Observable<Consulta> {
    return this.http.put<Consulta>(`${this.apiUrl}/${consulta.idx}`, consulta);
  }

  // Elimina
  deleteConsulta(idx: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idx}`);
  }
}
