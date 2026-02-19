import { Component, inject, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SeguridadService } from '../seguridadService';
import { Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserLogin } from '../../../models/users';
import { extraerErrores } from '../../compartido/funciones/extraer-errores';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule],
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

  //se crean los campos del formulario con sus validaciones
  form = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  obtenerErrorEmail() {
    let campo = this.form.controls['email'];

    if (campo.hasError('required')) {
      return 'El email es requerido';
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
    
    if (this.form.valid) {
      console.log('Guardando cambios...');
      console.log(this.form.value);

      this.userServicio.Login(this.form.value as UserLogin).subscribe({
        next: (response) => {
          console.log('Respuesta de autenticación:', response);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error al iniciar sesión:', error);
          const errores = extraerErrores(error);
          console.log('Mensajes de error:', errores);
          this.mensajesError = errores; // Guardar errores para mostrar en template
        }
      })
    } else {
      console.log('Formulario inválido');
    }
  }
}
