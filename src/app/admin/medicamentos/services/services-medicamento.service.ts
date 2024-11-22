import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Medicamentos } from '../models/medicamentos';


@Injectable({
  providedIn: 'root'
})
export class ServicesMedicamentoService {


  private getMedicamentosUrl = 'http://localhost:3000/inventory/view/okoko'; // URL para obtener medicamentos
  private addMedicamentoUrl = 'http://localhost:3000/inventory/add-inventory'; // URL para agregar un medicamento

  constructor(private http: HttpClient) {}

  getMedicamentos(): Observable<Medicamentos[]> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token no encontrado');
    }


    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // El token debe ir en el encabezado 'Authorization'
      'Content-Type': 'application/json'  // El tipo de contenido para enviar JSON
    });
    return this.http.get<Medicamentos[]>('http://localhost:3000/inventory/view-all',{headers}).pipe(
      catchError(error => {
        console.error('Error al obtener medicamentos:', error);
        return of([]);
      })
    );
  }

  addMedicamento(data:{}): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token no encontrado');
    }


    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // El token debe ir en el encabezado 'Authorization'
      'Content-Type': 'application/json'  // El tipo de contenido para enviar JSON
    });
    return this.http.post<any>(this.addMedicamentoUrl,data,{headers}).pipe(
      catchError(error => {
        console.error('Error al agregar medicamento:', error);
        return of(null);
      })
    )
  }

  addPresentacion(nombre : string,medicamento:Medicamentos):Observable<any>{

    console.log(nombre);


    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token no encontrado');
    }


    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // El token debe ir en el encabezado 'Authorization'
      'Content-Type': 'application/json'  // El tipo de contenido para enviar JSON
    });
    return this.http.put<any>(`http://localhost:3000/inventory/add/${nombre}`,medicamento,{headers})
  }


  updateMedicamento(id: string,medicamento:Medicamentos):Observable<any>{
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token no encontrado');
    }


    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // El token debe ir en el encabezado 'Authorization'
      'Content-Type': 'application/json'  // El tipo de contenido para enviar JSON
    });
    return this.http.put(`http://52.203.29.27/inventory/actualizar/${id}`,medicamento,{headers})
  }


  deleteMedicamentos(nombre:string):Observable<any>{
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token no encontrado');
    }


    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // El token debe ir en el encabezado 'Authorization'
      'Content-Type': 'application/json'  // El tipo de contenido para enviar JSON
    });
    return this.http.delete(`http://52.203.29.27/inventory/eliminar/${nombre}`,{headers}).pipe(
      catchError(err =>{
        console.log(err);
        return of(null)
      })
    )
  }
}
