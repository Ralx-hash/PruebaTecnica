import { Component, inject, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SeguridadService } from '../seguridadService';
import { Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserLogin } from '../../../models/users';
import { extraerErrores } from '../../compartido/funciones/extraer-errores';
import { emailConTildesValidator } from '../../compartido/funciones/email-validator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule,
    MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  //form builder para crear el formulario reactivo
  private formBuilder = inject(FormBuilder);
  //estas son inyecciones de dependencias para el servicio de seguridad y el router
  userServicio = inject(SeguridadService);
  router = inject(Router);

  // Propiedad para almacenar mensajes de error del servidor
  mensajesError: string[] = [];

  booleanCarga: boolean = false;

  //se crean los campos del formulario con sus validaciones
  form = this.formBuilder.group({
    email: ['', [Validators.required, emailConTildesValidator]],
    password: ['', [Validators.required]]
  })

  //estas 2 funciones son para mostrar los mensajes de error de validacion en el template
  obtenerErrorEmail() {
    let campo = this.form.controls['email'];

    if (campo.hasError('required')) {
      return 'El email es requerido';
    }
    
    if (campo.hasError('emailInvalido')) {
      return 'El formato del email no es válido';
    }
    
    return ""
  }

    obtenerErrorPassword() {
    let campo = this.form.controls['password'];

    if (campo.hasError('required')) {
      return 'La contraseña es requerida';
    }
    return ""
  }
  

  logear() {
    this.mensajesError = [];
    this.booleanCarga = true;
    
    if (this.form.valid) {

      this.userServicio.Login(this.form.value as UserLogin).subscribe({
        next: (response) => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          const errores = extraerErrores(error);
          this.mensajesError = errores; // Guardar errores para mostrar en template       
          this.booleanCarga = false;
        }
      })
    } else {
      this.mensajesError = ['Por favor, corrige los errores en el formulario.'];
    }
  }
}
