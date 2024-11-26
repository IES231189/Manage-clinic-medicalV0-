import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HojaEnfermeria } from '../model/hoja-enfermeria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HojaEnfermeriaService {

  private apiUrl = 'https://api-ejemplo.com/hoja-enfermeria'; // URL de la API

  constructor(private http: HttpClient) {}

  createHojaEnfermeria(hoja: HojaEnfermeria): Observable<any> {
    return this.http.post(this.apiUrl, hoja);
  }

  
}
