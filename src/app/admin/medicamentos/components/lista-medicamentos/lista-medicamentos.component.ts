
import { Component, OnInit } from '@angular/core';
import { ServicesMedicamentoService } from '../../services/services-medicamento.service';


@Component({
  selector: 'app-lista-medicamentos',
  templateUrl: './lista-medicamentos.component.html',
  styleUrls: ['./lista-medicamentos.component.css']
})
export class ListaMedicamentosComponent implements OnInit {
  data: any[] = [];
  columns = [
    { name: 'Nombre', type: 'text' },
    { name: 'Precio_Compra', type: 'number' },
    { name: 'Precio_Venta', type: 'number' },
    { name: 'Patente', type: 'text' },
    { name: 'Gramaje', type: 'text' },
    { name: 'Presentacion', type: 'text' },
    { name: 'Editar', type: 'button', action: 'edit' },
    { name: 'Eliminar', type: 'button', action: 'delete' }
  ];

  defaultData = [
    { id: 0, Nombre: 'Medicamento Ejemplo', Precio_Compra: 100, Precio_Venta: 150, Patente: 'Ejemplo', Gramaje: 'mg', Presentacion: 'tableta' }
  ];

  isLoading = true;
  selectedRow: any;
  showEditModal = false;
  showDeleteModal = false;

  constructor(private medicamentoService: ServicesMedicamentoService) {}

  ngOnInit(): void {
    this.fetchData();
  }




  fetchData(): void {
    this.isLoading = true;
    this.medicamentoService.getMedicamentos().subscribe(
      (response) => {
        this.data = response && response.length > 0 ? response : this.defaultData;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.data = this.defaultData;
        this.isLoading = false;
      }
    );
  }


  onEdit(row: any): void {
    this.selectedRow = row;
    this.showEditModal = true;
  }

  onDelete(row: any): void {
    this.selectedRow = row;
    this.showDeleteModal = true;
  }

  onSaveChanges(updatedData: any): void {
    const index = this.data.findIndex(item => item.id === updatedData.id);
    if (index > -1) {
      this.data[index] = updatedData;
    }
    this.showEditModal = false;
  }

  onDeleteConfirm(): void {
    this.data = this.data.filter(item => item.id !== this.selectedRow.id);
    this.showDeleteModal = false;
  }

  onCancel(): void {
    this.showEditModal = false;
    this.showDeleteModal = false;
  }
}
