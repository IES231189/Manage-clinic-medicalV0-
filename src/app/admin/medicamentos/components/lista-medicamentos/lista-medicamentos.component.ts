import { Component, OnInit } from '@angular/core';
import { ServicesMedicamentoService } from '../../services/services-medicamento.service';
import { Presentacion } from '../../models/medicamentos';

@Component({
  selector: 'app-lista-medicamentos',
  templateUrl: './lista-medicamentos.component.html',
  styleUrls: ['./lista-medicamentos.component.css']
})
export class ListaMedicamentosComponent implements OnInit {
  presentaciones: Presentacion[] = [];
  filteredPresentaciones: Presentacion[] = [];  // Esta es la lista filtrada
  isLoading = true;
  selectedRow: Presentacion | null = null;
  showDeleteModal = false;  // Controlar el modal de eliminación
  showEditModal = false;  // Controlar el modal de edición
  query: string = '';  // Esta es la variable que se usará para la búsqueda
  isAdmin : boolean = false;
  // Datos predeterminados
  defaultData: Presentacion[] = [
    {
      id: 'default-id',
      nombre: 'Medicamento de Prueba',
      precioCompra: '0',
      precio: 0,
      patente: 'Sin patente',
      gramaje: 'N/A',
      presentacion: 'Tabletas',
      fechaCaducidad: new Date(),
      cantidadCajas: '0',
      cantidadUnidadesCaja: 0
    }
  ];

  constructor(private medicamentoService: ServicesMedicamentoService) {}

  ngOnInit(): void {
    this.isAdmin = this.definirRol()
    this.fetchData();
  }

  fetchData(): void {
    this.isLoading = true;
    this.medicamentoService.getMedicamentos().subscribe(
      (response: Presentacion[]) => {
        this.presentaciones = response && response.length > 0 ? response : this.defaultData;
        this.filteredPresentaciones = this.presentaciones;  // Inicializa la lista filtrada
        this.isLoading = false;

      },
      (error) => {
        console.error('Error al obtener los medicamentos:', error);
        this.presentaciones = this.defaultData;
        this.filteredPresentaciones = this.presentaciones;  // Inicializa la lista filtrada
        this.isLoading = false;
      }
    );
  }

  onSearch(query: string): void {
    this.filteredPresentaciones = this.presentaciones.filter(medicamento =>
      medicamento.nombre.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Método para mostrar el modal de edición
  onEdit(row: Presentacion): void {
    this.selectedRow = { ...row };  // Copiar el registro seleccionado
    this.showEditModal = true;  // Mostrar el modal de edición
  }

  // Método para guardar los cambios de la edición
  onSaveChanges(updatedData: Presentacion): void {
    const index = this.presentaciones.findIndex(item => item.id === updatedData.id);
    if (index !== -1) {
      this.presentaciones[index] = updatedData;  // Actualizar la lista
      this.filteredPresentaciones = [...this.presentaciones];  // Actualizar lista filtrada
    }
    this.showEditModal = false; 
  }

  // Método para mostrar el modal de eliminación
  onDelete(row: Presentacion): void {
    this.selectedRow = row;
    this.showDeleteModal = true; 
  }




  onCancel(): void {
    this.showEditModal = false;
    this.showDeleteModal = false;
  }



  definirRol():boolean{
   let rol = localStorage.getItem('rol')
      if(rol != "admin"){
        return false
      }
      return true
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

  // Método para confirmar la eliminación
  onConfirmDelete(): void {
    if (this.selectedRow) {
      // Eliminar el registro de la lista
      this.presentaciones = this.presentaciones.filter(item => item.id !== this.selectedRow?.id);
      this.filteredPresentaciones = [...this.presentaciones]; // Actualizar lista filtrada
    }
    this.showDeleteModal = false;  // Cerrar el modal de eliminación
  }

  // Método para cancelar la eliminación
  onCancelDelete(): void {
    this.showDeleteModal = false;  // Solo cerrar el modal sin hacer cambios
  }

}
