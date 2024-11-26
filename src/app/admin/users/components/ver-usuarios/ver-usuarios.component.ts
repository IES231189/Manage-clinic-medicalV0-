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

 // Abre el modal de edición
 onEdit(row: Usuario): void {
  this.selectedRow = row;
  this.showEditModal = true;
}

// Abre el modal de eliminación
onDelete(row: Usuario): void {
  this.selectedRow = row;
  this.showDeleteModal = true;
}

// Guarda los cambios después de editar el usuario
onSaveChanges(updatedData: Usuario): void {
  if (this.selectedRow) {
    this.usuarioService.editarUsuarioPorId(this.selectedRow.id_user, updatedData).subscribe(
      (response) => {
        // Actualizar el usuario en la lista después de editarlo
        const index = this.data.findIndex(item => item.id_user === updatedData.id_user);
        if (index > -1) {
          this.data[index] = updatedData;
        }
        this.showEditModal = false;
      },
      (error) => {
        console.error('Error al editar el usuario:', error);
      }
    );
  }
}

// Confirma la eliminación del usuario
onDeleteConfirm(): void {
  if (this.selectedRow) {
    this.usuarioService.eliminarUsuarioPorId(this.selectedRow.id_user).subscribe(
      (response) => {
        // Elimina el usuario de la lista después de eliminarlo
        this.data = this.data.filter(item => item.id_user !== this.selectedRow!.id_user);
        this.showDeleteModal = false;
      },
      (error) => {
        console.error('Error al eliminar el usuario:', error);
      }
    );
  }
}

// Cancela el modal de edición o eliminación
onCancel(): void {
  this.showEditModal = false;
  this.showDeleteModal = false;
}
}
