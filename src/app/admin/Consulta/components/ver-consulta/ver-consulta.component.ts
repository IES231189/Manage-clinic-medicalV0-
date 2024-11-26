import { Component } from '@angular/core';
import { Consulta } from '../../models/consulta';
import { ConsultaService } from '../../Services/consulta.service';

@Component({
  selector: 'app-ver-consulta',
  templateUrl: './ver-consulta.component.html',
  styleUrls: ['./ver-consulta.component.css']
})
export class VerConsultaComponent {
  data: Consulta[] = [];
  columns = [
    { name: 'nombrePaciente', type: 'text' },
    { name: 'edad', type: 'number' },
    { name: 'alergias', type: 'text' },
    { name: 'nombreMedico', type: 'text' },
    { name: 'idx', type: 'text' },
    { name: 'dieta', type: 'text' },
    { name: 'medicamento', type: 'text' },
    { name: 'medidasGenerales', type: 'text' },
    { name: 'fecha', type: 'string' },
    { name: 'Editar', type: 'button', action: 'edit' },
    { name: 'Eliminar', type: 'button', action: 'delete' }
  ];


  isLoading = true;
  selectedRow: Consulta | null = null;
  showEditModal = false;
  showDeleteModal = false;

  // Datos predeterminados en caso de que no haya resultados de la API

  defaultData: Consulta[] = [
   
    
  ];

  constructor(private consultaService: ConsultaService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  // Obtener datos de la API
  fetchData(): void {
    this.isLoading = true;
    this.consultaService.getConsultas().subscribe(
      (response: Consulta[]) => {
        console.log('Datos obtenidos de la API:', response); // Verifica lo que devuelve la API
        this.data = response; // Asigna directamente los datos de la API
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener datos de la API:', error);
        this.isLoading = false;
      }
    );
  }


  // Editar consulta
  onEdit(row: Consulta): void {
    this.selectedRow = row;
    this.showEditModal = true;
  }

  // Eliminar consulta
  onDelete(row: Consulta): void {
    this.selectedRow = row;
    this.showDeleteModal = true;
  }

  // Guardar cambios de la consulta
  onSaveChanges(updatedData: Consulta): void {
    if (updatedData.id) {


      this.consultaService.updateConsulta(updatedData.id, updatedData).subscribe(

        (response) => {
          const index = this.data.findIndex(item => item.id === updatedData.id);
          if (index > -1) {
            this.data[index] = updatedData;
          }
          this.showEditModal = false;
        },
        (error) => console.error('Error updating consulta:', error)
      );
    }
  }

  // Confirmar eliminación de la consulta
  onDeleteConfirm(): void {
    if (this.selectedRow && this.selectedRow.id) {
      this.consultaService.deleteConsulta(this.selectedRow.id).subscribe(
        () => {
          this.data = this.data.filter(item => item.id !== this.selectedRow!.id);
          this.showDeleteModal = false;
        },
        (error) => console.error('Error deleting consulta:', error)
      );
    }
  }

  // Cancelar edición o eliminación
  onCancel(): void {
    this.showEditModal = false;
    this.showDeleteModal = false;
  }
}
