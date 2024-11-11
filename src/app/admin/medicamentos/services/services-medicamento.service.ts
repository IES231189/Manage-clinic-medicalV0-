import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicesMedicamentoService {

  private apiUrl = 'https://api.tu-servidor.com/medicamentos';

  //na mas 2 metodos falta el update y delete

  private getMedicamentosUrl = 'https://api.tu-servidor.com/medicamentos'; // URL para obtener medicamentos
  private addMedicamentoUrl = 'http://52.203.29.27/inventory/add-inventory'; // URL para agregar un medicamento

  constructor(private http: HttpClient) {}

  getMedicamentos(): Observable<any[]> {
    return this.http.get<any[]>(this.getMedicamentosUrl).pipe(
      catchError(error => {
        console.error('Error al obtener medicamentos:', error);
        return of([]);
      })
    );
  }


  addMedicamento(medicamento: any): Observable<any> {
    return this.http.post<any>(this.addMedicamentoUrl, medicamento).pipe(
      catchError(error => {
        console.error('Error al agregar medicamento:', error);
        return of(null);
      })
    )

  }




}
