import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Medicamento, HojaEnfermeria } from '../../model/hoja-enfermeria';
import { HojaEnfermeriaService } from '../../service/hoja-enfermeria.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-hoja',
  templateUrl: './hoja.component.html',
  styleUrls: ['./hoja.component.css']
})
export class HojaComponent {
  @Input() hojaEnfermeriaData: HojaEnfermeria | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<HojaEnfermeria>();

  hojaForm: FormGroup;
  medicamentos: FormArray;
  isSubmitting = false; // Indica si la solicitud está en curso

  constructor(private fb: FormBuilder, private hojaService: HojaEnfermeriaService , private route:Router) {
    this.hojaForm = this.fb.group({
      nombrePaciente: ['', Validators.required],
      numeroCamilla: ['', Validators.required],
      diagnostico: ['', Validators.required],
      indicacionesMedicas: [''],
      medicamentos: this.fb.array([])
    });

    this.medicamentos = this.hojaForm.get('medicamentos') as FormArray;
  }

  ngOnInit(): void {
    if (this.hojaEnfermeriaData) {
      this.hojaForm.patchValue({
        nombrePaciente: this.hojaEnfermeriaData.nombrePaciente,
        numeroCamilla: this.hojaEnfermeriaData.numeroCamilla,
        diagnostico: this.hojaEnfermeriaData.diagnostico,
        indicacionesMedicas: this.hojaEnfermeriaData.indicacionesMedicas
      });
      this.hojaEnfermeriaData.medicamentos.forEach((med) => {
        this.addMedicamento(med);
      });
    }
  }

  get medicamentoControls() {
    return (this.hojaForm.get('medicamentos') as FormArray).controls;
  }

  addMedicamento(medicamento?: Medicamento): void {
    const medicamentoForm = this.fb.group({
      nombre: [medicamento?.nombre || '', Validators.required],
      presentacion: [medicamento?.presentacion || '', Validators.required],
      dosis: [medicamento?.dosis || '', Validators.required],
      via: [medicamento?.via || '', Validators.required],
      hora: [medicamento?.hora || '', Validators.required],
      diaTratamiento: [medicamento?.diaTratamiento || '', Validators.required]
    });

    this.medicamentos.push(medicamentoForm);
  }

  removeMedicamento(index: number): void {
    this.medicamentos.removeAt(index);
  }

  onClose(): void {
    this.close.emit();
  }

  onSubmit(): void {

    if (!this.hojaForm.valid) {
      this.hojaForm.markAllAsTouched();
      this.validateMedicamentos();
      alert('Por favor complete todos los campos obligatorios.');
      return;
    }

    if (this.medicamentos.length === 0) {
      alert('Debe agregar al menos un medicamento.');
      return;
    }

    this.isSubmitting = true;
    const formData: HojaEnfermeria = this.hojaForm.value;

    this.hojaService.createHojaEnfermeria(formData).subscribe({
      next: (response) => {
        console.log('Datos enviados correctamente:', response);
        this.submit.emit(formData);
        this.isSubmitting = false;
        this.hojaForm.reset();
        alert('Hoja de enfermería guardada exitosamente.');
        this.route.navigate(['user'])
      },
      error: (error) => {
        console.error('Error al enviar los datos:', error);
        this.isSubmitting = false;
        alert('Ocurrió un error al guardar los datos.');
      }
    });
  }

  validateMedicamentos(): void {
    this.medicamentos.controls.forEach((control) => control.markAllAsTouched());
  }

}
