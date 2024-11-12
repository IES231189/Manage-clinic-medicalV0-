import { Component } from '@angular/core';
import { Card } from '../../../../shared/components/modal-de-acciones/model/card';

@Component({
  selector: 'app-consultas-modal',
  templateUrl: './consultas-modal.component.html',
  styleUrl: './consultas-modal.component.css'
})
export class ConsultasModalComponent {
  showModal: boolean = true;

  cards: Card[] = [
    { title: 'Nueva Consulta', message: '', action: 'admin/dashboard/consultas/AgregarConsultas', url: '../../../assets/consulta.png' },
    { title: 'Ver Consultas', message: '', action: '/admin/verConsultas', url: '../../../assets/consulta.png' }
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
