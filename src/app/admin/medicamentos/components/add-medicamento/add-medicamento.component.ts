
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BarcodeScannerComponent } from '../barcode-scanner-component/barcode-scanner-component.component';
import { Router } from '@angular/router';
import { ServicesMedicamentoService } from '../../services/services-medicamento.service';
import { Medicamentos } from '../../models/medicamentos';
@Component({
  selector: 'app-add-medicamento',
  templateUrl: './add-medicamento.component.html',
  styleUrls: ['./add-medicamento.component.css']
})
export class AddMedicamentoComponent implements OnInit {
  medicamentoForm: FormGroup;

  data: Medicamentos[] = [];    

  @ViewChild(BarcodeScannerComponent) barcodeScanner!: BarcodeScannerComponent;

  constructor(private fb: FormBuilder , private router:Router , private medicamentosService:ServicesMedicamentoService) {
    this.medicamentoForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      precioCompra: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      patente: ['', Validators.required],
      gramaje: ['', Validators.required],
      presentacion: ['', Validators.required],
      fechaCaducidad: ['', Validators.required],
<<<<<<< HEAD
      barcodeDisplay: [{ value: '', disabled: true }]
=======
      // barcodeDisplay: [{ value: '', disabled: true }]
>>>>>>> repuesto
    });
  }

  ngOnInit(): void {
    this.fetchData()
  }

  // //  asignar el código detectado al campo del formulario
  // onBarcodeDetected(): void {
  //   this.medicamentoForm.patchValue({
  //     barcodeDisplay: this.barcodeScanner.resultText // Asigna el código detectado
  //   });
  // }


  fetchData(): void {
    this.medicamentosService.getMedicamentos().subscribe(
      (response: Medicamentos[]) => {
        console.log('Datos recibidos:', response);  // Verifica qué se está recibiendo
        //si response envia datos de tipo medicamento correctamente asignamos los datos recibidos a un arreglo
        this.data = response && response.length > 0 ? response : [];
      },
      (error) => {
        console.error('Error al obtener los medicamentos:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.medicamentoForm.valid) {
      const formData = this.medicamentoForm.getRawValue();
      this.medicamentosService.addMedicamento(formData).subscribe(
        (response) => {
          console.log('Medicamento agregado con éxito:', response);
         this.router.navigate(['/admin']);
        },
        (error) => {
          console.error('Error al enviar el medicamento:', error);
        }
      );
    } else {
      console.log("Formulario no válido");
    }
  }

}
