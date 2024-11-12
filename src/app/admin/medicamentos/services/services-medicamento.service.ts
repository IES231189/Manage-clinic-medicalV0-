import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Medicamentos } from '../models/medicamentos';

@Injectable({
  providedIn: 'root'
})
export class ServicesMedicamentoService {


  private getMedicamentosUrl = 'http://52.203.29.27/inventory/view'; // URL para obtener medicamentos
  private addMedicamentoUrl = 'http://52.203.29.27/inventory/add-inventory'; // URL para agregar un medicamento

  constructor(private http: HttpClient) {}

  getMedicamentos(): Observable<Medicamentos[]> {
    return this.http.get<Medicamentos[]>(this.getMedicamentosUrl).pipe(
      catchError(error => {
        console.error('Error al obtener medicamentos:', error);
        return of([]);
      })
    );
  }


  addMedicamento(medicamento: Medicamentos): Observable<any> {
    return this.http.post<any>(this.addMedicamentoUrl, medicamento).pipe(
      catchError(error => {
        console.error('Error al agregar medicamento:', error);
        return of(null);
      })
    )

  }


  updateMedicamento(id: number,medicamento:Medicamentos):Observable<any>{
    return this.http.put(`http://52.203.29.27/inventory/actualizar/${id}`,medicamento)
  }


  deleteMedicamentos(nombre:string):Observable<any>{
    return this.http.delete(`http://52.203.29.27/inventory/eliminar/${nombre}`).pipe(
      catchError(err =>{
        console.log(err);
        return of(null)
      })
    )
  }
}
