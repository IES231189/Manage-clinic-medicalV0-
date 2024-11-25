import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.component.html',
  styleUrls: ['./ver-usuarios.component.css']
})
export class VerUsuariosComponent implements OnInit {
  data: Usuario[] = [];
  columns = [
    { name: 'rol', type: 'text' },
    { name: 'nombre', type: 'text' },
    { name: 'apellido', type: 'text' },
    { name: 'email', type: 'text' },
    { name: 'num_tel', type: 'text' },
    { name: 'Editar', type: 'button', action: 'edit' },
    { name: 'Eliminar', type: 'button', action: 'delete' }
  ];

  defaultData: Usuario[] = [];

  isLoading = true;
  selectedRow: Usuario | null = null;
  showEditModal = false;
  showDeleteModal = false;

  constructor(private usuarioService: UsuariosService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.isLoading = true;
    this.usuarioService.mostrarUsuario().subscribe(
      (response: any) => {  // Asegúrate de manejar correctamente el tipo de respuesta
        if (response && response.data && response.data.length > 0) {
          this.data = response.data;  // Asignamos los datos a la variable 'data'
        } else {
          this.data = [];  // Si no hay datos, dejamos el arreglo vacío
        }
        this.isLoading = false;  // Cambiamos el estado de carga
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
        this.data = [];  // En caso de error, mostramos un arreglo vacío
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
    // Aquí iría la lógica para enviar los cambios al backend
    const index = this.data.findIndex(item => item.id_user === updatedData.id_user);
    if (index > -1) {
      this.data[index] = updatedData;
    }
    this.showEditModal = false;
  }

  onDeleteConfirm(): void {
    if (this.selectedRow) {
      // Aquí agregas la llamada al servicio para eliminar el usuario
      this.data = this.data.filter(item => item.id_user !== this.selectedRow!.id_user);
      this.showDeleteModal = false;
    }
  }

  onCancel(): void {
    this.showEditModal = false;
    this.showDeleteModal = false;
  }
}
