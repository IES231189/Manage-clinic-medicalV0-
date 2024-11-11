// add-medicamento.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BarcodeScannerComponent } from '../barcode-scanner-component/barcode-scanner-component.component';
import { Router } from '@angular/router';
import { ServicesMedicamentoService } from '../../services/services-medicamento.service';

@Component({
  selector: 'app-add-medicamento',
  templateUrl: './add-medicamento.component.html',
  styleUrls: ['./add-medicamento.component.css']
})
export class AddMedicamentoComponent implements OnInit {
  medicamentoForm: FormGroup;

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
      barcodeDisplay: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {}

  // //  asignar el código detectado al campo del formulario
  // onBarcodeDetected(): void {
  //   this.medicamentoForm.patchValue({
  //     barcodeDisplay: this.barcodeScanner.resultText // Asigna el código detectado
  //   });
  // }

  onSubmit(): void {
    if (this.medicamentoForm.valid) {
      const formData = this.medicamentoForm.getRawValue();
      this.medicamentosService.addMedicamento(formData).subscribe(
        (response) => {
          console.log('Medicamento agregado con éxito:', response);
          // this.router.navigate(['/admin/dashboard/medicamentos']);
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
