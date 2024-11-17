import { Component, OnInit } from '@angular/core';
import { ServicesMedicamentoService } from '../../services/services-medicamento.service';
import { Medicamentos } from '../../models/medicamentos';

@Component({
  selector: 'app-lista-medicamentos',
  templateUrl: './lista-medicamentos.component.html',
  styleUrls: ['./lista-medicamentos.component.css']
})
export class ListaMedicamentosComponent implements OnInit {
  data: Medicamentos[] = [];
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
      (response: Medicamentos[]) => {
        console.log('Datos recibidos:', response);  // Verifica qué se está recibiendo
        this.data = response && response.length > 0 ? response : [];
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener los medicamentos:', error);
        this.isLoading = false;
      }
    );
  }

  onEdit(row: Medicamentos): void {
    this.selectedRow = {...row};
    this.showEditModal = true;
  }

  onDelete(row: Medicamentos): void {
    this.selectedRow = row;
    this.showDeleteModal = true;
  }

  onDeleteConfirm(): void {
    if (this.selectedRow) {
      console.log('Nombre del medicamento a eliminar:', this.selectedRow.nombre); // Verificar el nombre
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
}
