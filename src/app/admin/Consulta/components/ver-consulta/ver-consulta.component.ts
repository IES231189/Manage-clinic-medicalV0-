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
    {
      id:1,
      idx: 'vbvnvnnn',
      nombrePaciente: 'Juan Pérez',
      edad: 30,
      alergias: 'Ninguna',
      nombreMedico: 'Dr. López',
      dieta: 'Normal',
      medicamento: 'Paracetamol',
      medidasGenerales: 'Control de presión',
      fecha: new Date(2024, 10, 5)
    },
    {
      id:2,
      idx: 'dfmdsfdskfmd',
      nombrePaciente: 'Ana Gómez',
      edad: 45,
      alergias: 'Polen',
      nombreMedico: 'Dr. Fernández',
      dieta: 'Baja en sal',
      medicamento: 'Ibuprofeno',
      medidasGenerales: 'Revisión regular',
      fecha: new Date(2024, 10, 3)
    }
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
    if (updatedData.idx) {
      this.consultaService.updateConsulta(updatedData).subscribe(
        (response) => {
          const index = this.data.findIndex(item => item.idx === updatedData.idx);
          if (index > -1) {
            this.data[index] = updatedData;  // Actualizamos la fila en la tabla
          }
          this.showEditModal = false;
        },
        (error) => console.error('Error updating consulta:', error)
      );
    }
  }

  // Confirmar eliminación de la consulta
  onDeleteConfirm(): void {
    if (this.selectedRow && this.selectedRow.idx) {
      this.consultaService.deleteConsulta(this.selectedRow.idx).subscribe(
        () => {
          this.data = this.data.filter(item => item.idx !== this.selectedRow!.idx);
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
