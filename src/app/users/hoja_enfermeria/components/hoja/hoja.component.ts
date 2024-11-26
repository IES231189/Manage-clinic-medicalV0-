import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HojaEnfermeria } from '../../model/hoja-enfermeria';
import { HospitalizacionService } from '../../service/hoja-enfermeria.service';
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
  isSubmitting = false; // Indica si la solicitud está en curso

  constructor(private fb: FormBuilder, private hojaService: HospitalizacionService, private route: Router) {
    this.hojaForm = this.fb.group({
      nombrePaciente: ['', Validators.required],
      numeroCamilla: ['', Validators.required],
      diagnostico: ['', Validators.required],
      indicacionesMedicas: [''],
      nombre: ['', Validators.required],
      presentacion: ['', Validators.required],
      dosis: ['', Validators.required],
      via: ['', Validators.required],
      hora: ['', Validators.required],
      diaTratamiento: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.hojaEnfermeriaData) {
      // Cargar los datos de la hoja de enfermería en el formulario
      this.hojaForm.patchValue({
        nombrePaciente: this.hojaEnfermeriaData.nombrePaciente,
        numeroCamilla: this.hojaEnfermeriaData.numeroCamilla,
        diagnostico: this.hojaEnfermeriaData.diagnostico,
        indicacionesMedicas: this.hojaEnfermeriaData.indicacionesMedicas,
        nombre: this.hojaEnfermeriaData.nombre,
        presentacion: this.hojaEnfermeriaData.presentacion,
        dosis: this.hojaEnfermeriaData.dosis,
        via: this.hojaEnfermeriaData.via,
        hora: this.hojaEnfermeriaData.hora,
        diaTratamiento: this.hojaEnfermeriaData.diaTratamiento
      });
    }
  }

  // Método para enviar el formulario
  onSubmit(): void {
    if (!this.hojaForm.valid) {
      this.hojaForm.markAllAsTouched();
      alert('Por favor complete todos los campos obligatorios.');
      return;
    }

    // Verificar que todos los campos requeridos estén completos
    if (!this.hojaForm.value.nombre || !this.hojaForm.value.presentacion || !this.hojaForm.value.dosis ||
        !this.hojaForm.value.via || !this.hojaForm.value.hora || !this.hojaForm.value.diaTratamiento) {
      alert('Debe completar todos los campos de medicamentos.');
      return;
    }

    this.isSubmitting = true;
    const formData: HojaEnfermeria = this.hojaForm.value;

    this.hojaService.addHospitalizacion(formData).subscribe({
      next: (response) => {
        console.log('Datos enviados correctamente:', response);
        this.submit.emit(formData);
        this.isSubmitting = false;
        this.hojaForm.reset();
        alert('Hoja de enfermería guardada exitosamente.');
        this.route.navigate(['user']);
      },
      error: (error) => {
        console.error('Error al enviar los datos:', error);
        this.isSubmitting = false;
        alert('Ocurrió un error al guardar los datos.');
      }
    });
  }

  // Método para cerrar el modal
  onClose(): void {
    this.close.emit();
  }
}
