import { Presentacion } from './../../models/medicamentos';
import { Component, OnInit } from '@angular/core';
import { ServicesMedicamentoService } from '../../services/services-medicamento.service';

import { Medicamentos} from '../../models/medicamentos';

@Component({
  selector: 'app-lista-medicamentos',
  templateUrl: './lista-medicamentos.component.html',
  styleUrls: ['./lista-medicamentos.component.css']
})
export class ListaMedicamentosComponent implements OnInit {
  data: Medicamentos[] = [];
  presentaciones: Presentacion[] = [];
  isLoading = true;
  selectedRow: Medicamentos | null = null;
  showEditModal = false;
  showDeleteModal = false;

  constructor(private medicamentoService: ServicesMedicamentoService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.isLoading = true;
    this.medicamentoService.getMedicamentos().subscribe(
      (response: Presentacion[]) => {
        console.log('Datos recibidos:', response); // Log data structure
        this.presentaciones = response && response.length > 0 ? response : [];
        this.isLoading = false;
      //  this.extraerPresentaciones();
      },
      (error) => {
        console.error('Error al obtener los medicamentos:', error);
        this.isLoading = false;
      }
    );
  }



  onEdit(row: Medicamentos): void {
    this.selectedRow = { ...row };
    this.showEditModal = true;
  }

  onDelete(row: Medicamentos): void {
    this.selectedRow = row;
    this.showDeleteModal = true;
  }

  onDeleteConfirm(): void {
    if (this.selectedRow) {
      this.medicamentoService.deleteMedicamentos(this.selectedRow.nombre).subscribe({
        next: (response) => {
          if (response && response.success) {
            this.data = this.data.filter(item => item.nombre !== this.selectedRow!.nombre);
            this.showDeleteModal = false;
            this.selectedRow = null;
          } else {
            console.error(response?.message || 'Error desconocido');
            this.showDeleteModal = false;
            this.selectedRow = null;
          }
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          this.showDeleteModal = false;
          this.selectedRow = null;
        }
      });
    }
  }

  onCancel(): void {
    this.showEditModal = false;
    this.showDeleteModal = false;
  }

  // extraerPresentaciones(): void {
  //   this.presentaciones = [];
  //   this.data.forEach(medicamento => {
  //     const { nombre, presentacion } = medicamento;
  //     if (presentacion && presentacion.length > 0) {
  //       presentacion.forEach(item => {
  //         // Añadimos la propiedad 'nombre' para poder identificar a qué medicamento pertenece
  //         this.presentaciones.push({ ...item, nombre });
  //       });
  //     }
  //   });
  // }
}




