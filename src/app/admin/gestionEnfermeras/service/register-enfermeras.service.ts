
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterEnfermerasService {


  private CrearEnfermera = 'https://api.tu-servidor.com/enfermeras';
  private verEnfemeras = 'https://api.tu-servidor.com/enfermeras';


  constructor(private http: HttpClient) {}


  createEnfermera(enfermeraData: any): Observable<any> {
    return this.http.post<any>(this.CrearEnfermera, enfermeraData);
  }

  getEnfermeras(): Observable<any[]> {
    return this.http.get<any[]>(this.verEnfemeras).pipe(
      catchError(error => {
        console.error('Error al obtener medicamentos:', error);
        return of([]);
      })
    );
  }

}



