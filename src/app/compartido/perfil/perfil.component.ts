import { Component, inject } from '@angular/core';
import { SeguridadService } from '../../seguridad/seguridadService';
import { MatCardModule } from '@angular/material/card';
import { UsuarioPerfilDTO } from '../../../models/users';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-perfil',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  seguridadService = inject(SeguridadService);

  perfil: UsuarioPerfilDTO | null = null;

  ngOnInit(): void {
    this.seguridadService.obtenerPerfil().subscribe({
      next: (data) => {
        this.perfil = data;
      },
      error: (err) => {
        console.error('Error al obtener perfil', err);
      }
    });
  }
}
