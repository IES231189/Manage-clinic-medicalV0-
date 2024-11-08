import { Component, Input  } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from './model/card';

@Component({
  selector: 'app-modal',
  templateUrl: './modal-de-acciones.component.html',
  styleUrls: ['./modal-de-acciones.component.css']
})
export class ModalDeAccionesComponent   {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() img: string = '';
  @Input() buttons: { label: string, action: () => void }[] = [];
  @Input() cards: Card[] = [];
  @Input() navigation:string = '';
  isOpen:boolean = true;


  constructor(private router: Router) {}

  closeModal(){
    this.isOpen = false;
    this.router.navigate([this.navigation])
  }

  navigate(action: string) {
    this.router.navigate([action]);
  }


}
