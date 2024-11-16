import { Component } from '@angular/core';
import { Card } from '../../../../shared/components/modal-de-acciones/model/card';

@Component({
  selector: 'app-modal-users',
  templateUrl: './modal-users.component.html',
  styleUrl: './modal-users.component.css'
})
export class ModalUsersComponent {
  showModal: boolean = true;

  cards: Card[] = [
    { title: 'Agregar Usuarios', message: '', action: 'admin/register', url: '../../../assets/citasAdd.png' },
    { title: 'Ver Usuarios', message: '', action: '/admin/all-usuarios', url: '../../../assets/HUsers.png' }
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
