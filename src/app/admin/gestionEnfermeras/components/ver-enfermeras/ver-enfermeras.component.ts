import { Component, OnInit } from '@angular/core';
import { RegisterEnfermerasService } from '../../service/register-enfermeras.service';
import { Enfermeras } from '../../models/enfemeras';

@Component({
  selector: 'app-ver-enfermeras',
  templateUrl: './ver-enfermeras.component.html',
  styleUrl: './ver-enfermeras.component.css'
})
export class VerEnfermerasComponent implements OnInit {
  data: Enfermeras[] = [];

  columns = [
    { name: 'nombre', type: 'text' },
    { name: 'apellidoPaterno', type: 'text' },
    { name: 'apellidoMaterno', type: 'text' },
    { name: 'correo', type: 'text' },
    { name: 'usuario', type: 'text' },
    { name: 'contrasena', type: 'text' },
    { name: 'Editar', type: 'button', action: 'edit' },
    { name: 'Eliminar', type: 'button', action: 'delete' }
  ];


  defaultData: Enfermeras[] = [
    { nombre: 'Ejemplo', apellidoPaterno: 'Ejemplo', apellidoMaterno: 'Ejemplo', correo: 'ejemplo@correo.com', usuario: 'ejemplo', contrasena: 'ejemplo123' }
  ];

  isLoading = true;
  selectedRow: Enfermeras | null = null;
  showEditModal = false;
  showDeleteModal = false;

  constructor(private enfermeraService: RegisterEnfermerasService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.isLoading = true;
    this.enfermeraService.getEnfermeras().subscribe(
      (response: Enfermeras[]) => {
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

  onEdit(row: Enfermeras): void {
    this.selectedRow = row;
    this.showEditModal = true;
  }

  onDelete(row: Enfermeras): void {
    this.selectedRow = row;
    this.showDeleteModal = true;
  }

  onSaveChanges(updatedData: Enfermeras): void {
    const index = this.data.findIndex(item => item.id === updatedData.id);
    if (index > -1) {
      this.data[index] = updatedData;
    }
    this.showEditModal = false;
  }

  onDeleteConfirm(): void {
    if (this.selectedRow) {
      this.data = this.data.filter(item => item.id !== this.selectedRow!.id);
      this.showDeleteModal = false;
    }
  }

  onCancel(): void {
    this.showEditModal = false;
    this.showDeleteModal = false;
  }
}
