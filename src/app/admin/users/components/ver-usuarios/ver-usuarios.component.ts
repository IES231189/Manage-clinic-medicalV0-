import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuariosService } from '../../services/usuarios.service';


@Component({
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.component.html',
  styleUrl: './ver-usuarios.component.css'
})
export class VerUsuariosComponent {
  data: Usuario[] = [];

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


  defaultData: Usuario[] = [
    { nombre: 'Ejemplo', apellidoPaterno: 'Ejemplo', apellidoMaterno: 'Ejemplo', correo: 'ejemplo@correo.com', usuario: 'ejemplo', contrasena: 'ejemplo123' }
  ];

  isLoading = true;
  selectedRow: Usuario | null = null;
  showEditModal = false;
  showDeleteModal = false;

  constructor(private usuario: UsuariosService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.isLoading = true;
    this.usuario.mostrarUsuario().subscribe(
      (response: Usuario[]) => {
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

  onEdit(row: Usuario): void {
    this.selectedRow = row;
    this.showEditModal = true;
  }

  onDelete(row: Usuario): void {
    this.selectedRow = row;
    this.showDeleteModal = true;
  }

  onSaveChanges(updatedData: Usuario): void {
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
