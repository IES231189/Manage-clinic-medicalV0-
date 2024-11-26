import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicamentos } from '../../../admin/medicamentos/models/medicamentos';


@Injectable({
  providedIn: 'root'
})
export class MedicamentosService {

  private apiUrl = 'http://localhost:3000/medicamentos';

  constructor(private http: HttpClient) {}

  getMedicamentos(): Observable<Medicamentos[]> {
    return this.http.get<Medicamentos[]>(this.apiUrl);
  }

  updateMedicamento(medicamento: Medicamentos): Observable<Medicamentos> {
    return this.http.put<Medicamentos>(`${this.apiUrl}/${medicamento.nombre}`, medicamento);
  }

  deleteMedicamento(nombre: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${nombre}`);
  }
}
