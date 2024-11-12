
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterEnfermerasService } from '../../service/register-enfermeras.service';

@Component({
  selector: 'app-agregar-enfermeras',
  templateUrl: './agregar-enfermeras.component.html',
  styleUrl: './agregar-enfermeras.component.css'
})


export class AgregarEnfermeras implements OnInit {
  enfermeraForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private enfermeraService: RegisterEnfermerasService
  ) {
    this.enfermeraForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      usuario: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.enfermeraForm.valid) {
      this.enfermeraService.createEnfermera(this.enfermeraForm.value).subscribe(
        (response) => {
          console.log('Enfermera registrada con éxito:', response);
          this.router.navigate(['/admin/verEnfermeras']);
        },
        (error) => {
          console.error('Error al registrar enfermera:', error);
        }
      );
    } else {
      console.log('Formulario no válido');
      console.log(this.enfermeraForm.errors); 
      Object.keys(this.enfermeraForm.controls).forEach((key) => {
        const controlErrors = this.enfermeraForm.get(key)?.errors;
        if (controlErrors) {
          console.log(`Errores en el campo ${key}:`, controlErrors);
        }
      });
    }
  }




}
