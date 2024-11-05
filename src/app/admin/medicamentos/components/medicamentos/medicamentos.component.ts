import { Component } from '@angular/core';

interface Card {
  title: string;
  message: string;
  action: string;
  url?: string;
}

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.css']
})
export class MedicamentosComponent {
  showModal: boolean = true;

  cards: Card[] = [
    { title: 'Agregar Medicamento', message: '', action: '/agendar-cita', url: '../../../assets/medicineAdd.png' },
    { title: 'Historial Medico', message: '', action: '/ver-citas', url: '../../../assets/historialMedico.png' }
  ];

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onModalButtonClick() {
    console.log('Botón del modal presionado');
    this.closeModal();
  }
}
