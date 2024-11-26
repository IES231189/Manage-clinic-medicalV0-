import { Component  , OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-form-add-usuarios',
  templateUrl: './form-add-usuarios.component.html',
  styleUrl: './form-add-usuarios.component.css'
})
export class FormAddUsuariosComponent implements OnInit {
  usuariosForms: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarios: UsuariosService
  ) {
    this.usuariosForms = this.fb.group({
      rol : ['',Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contra: ['', [Validators.required, Validators.minLength(6)]],
      num_tel : ['',[Validators.required,Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.usuariosForms.valid) {
      this.usuarios.crearUsuario(this.usuariosForms.value).subscribe(
        (response) => {
          console.log('Enfermera registrada con éxito:', response);
          // this.router.navigate(['/admin/all-usuarios']);
        },
        (error) => {
          console.error('Error al registrar enfermera:', error);
          // this.router.navigate(['admin/dashboard/usuarios'])
        }
      );
    } else {
      console.log('Formulario no válido');
      console.log(this.usuariosForms.errors);
      Object.keys(this.usuariosForms.controls).forEach((key) => {
        const controlErrors = this.usuariosForms.get(key)?.errors;
        if (controlErrors) {
          console.log(`Errores en el campo ${key}:`, controlErrors);
        }
      });

    }
  }
}
