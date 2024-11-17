import { Component } from '@angular/core';
import { ServicesMedicamentoService } from '../../services/services-medicamento.service';

@Component({
  selector: 'app-add-medicamento-general',
  templateUrl: './add-medicamento-general.component.html',
  styleUrl: './add-medicamento-general.component.css'
})
export class AddMedicamentoGeneralComponent {

  constructor(private medicamentoService : ServicesMedicamentoService){}

  data = {
    nombre: ''
  }

  onSubmit(){
      this.medicamentoService.addMedicamento(this.data).subscribe({
        next:()=>{
          console.log("se mando los datos :",this.data);
        }
      })
  }

}
