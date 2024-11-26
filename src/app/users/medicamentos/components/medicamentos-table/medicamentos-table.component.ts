import { Component } from '@angular/core';
import { Medicamentos } from '../../../../admin/medicamentos/models/medicamentos';
import { MedicamentosService } from '../../services/medicamentos.service';

@Component({
  selector: 'app-medicamentos-table',
  templateUrl: './medicamentos-table.component.html',
  styleUrl: './medicamentos-table.component.css'
})
export class MedicamentosTableComponent {
  data: Medicamentos[] = [];
  isLoading = true;
  selectedRow: Medicamentos | null = null;
  showEditModal = false;
  showDeleteModal = false;

  columns = [
    { name: 'nombre', type: 'text' },
    { name: 'patente', type: 'text' },
    { name: 'presentaciones', type: 'text' },
    { name: 'gramaje', type: 'text' },
    { name: 'precio', type: 'number' },
    { name: 'fechaCaducidad', type: 'text' },
    { name: 'Editar', type: 'button', action: 'edit' },
    { name: 'Eliminar', type: 'button', action: 'delete' }
  ];

  defaultData: Medicamentos[] = [
    {
      nombre: 'Paracetamol',
      patente: 'Generico',
      presentaciones: 'Tableta',
      gramaje: '500mg',
      precio: 50,
      precioCompra: 40,
      fechaCaducidad: '2025-12-31'
    }
  ];

  constructor(private medicamentosService: MedicamentosService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.isLoading = true;
    this.medicamentosService.getMedicamentos().subscribe(
      (response: Medicamentos[]) => {
        this.data = response.length > 0 ? response : this.defaultData;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.data = this.defaultData;
        this.isLoading = false;
      }
    );
  }

  onEdit(row: Medicamentos): void {
    this.selectedRow = row;
    this.showEditModal = true;
  }

  onDelete(row: Medicamentos): void {
    this.selectedRow = row;
    this.showDeleteModal = true;
  }

  onSaveChanges(updatedData: Medicamentos): void {
    const index = this.data.findIndex(item => item.nombre === updatedData.nombre);
    if (index > -1) {
      this.data[index] = updatedData;
    }
    this.showEditModal = false;
  }

  onDeleteConfirm(): void {
    if (this.selectedRow) {
      this.data = this.data.filter(item => item.nombre !== this.selectedRow!.nombre);
      this.showDeleteModal = false;
    }
  }

  onCancel(): void {
    this.showEditModal = false;
    this.showDeleteModal = false;
  }
}
