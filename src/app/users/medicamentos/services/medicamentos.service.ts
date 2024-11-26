import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicamentos } from '../../../admin/medicamentos/models/medicamentos'; // Asegúrate de que el modelo esté bien importado

@Injectable({
  providedIn: 'root'
})
export class MedicamentosService {

  
  private apiUrl = 'http://localhost:3000/inventory';

  constructor(private http: HttpClient) {}

  // Método para obtener todos los medicamentos guardados
  getMedicamentos(): Observable<Medicamentos[]> {
    return this.http.get<Medicamentos[]>(this.apiUrl); // Realizamos la llamada a la API que devuelve todos los medicamentos
  }

  // Método para actualizar un medicamento
  updateMedicamento(medicamento: Medicamentos): Observable<Medicamentos> {
    return this.http.put<Medicamentos>(`${this.apiUrl}/${medicamento.nombre}`, medicamento); // Utiliza el nombre del medicamento para actualizarlo
  }

  // Método para eliminar un medicamento por nombre
  deleteMedicamento(nombre: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${nombre}`); // Elimina el medicamento por nombre
  }
}

