import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SeguridadService } from '../seguridad/seguridadService';
import { UsuarioListaDTO } from '../../models/users';
import { take } from 'rxjs';
import { PerfilComponent } from '../compartido/perfil/perfil.component';

@Component({
  selector: 'app-lista-usuarios',
  imports: [MatToolbarModule, MatButtonModule, CommonModule, MatPaginatorModule, MatTableModule, 
    PerfilComponent],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent implements OnInit{

  ngOnInit(): void {
    this.userServicio.obtenerUsuarios().pipe(take(1)).subscribe({
      next: (data) => {
        this.listaUsuarios = data;
        console.log('Usuarios obtenidos:', this.listaUsuarios);
      },
      error: (err) => {
        console.error('Error al obtener usuarios', err);
      }
    });
    
  }

  listaUsuarios: UsuarioListaDTO[] = [];
  
  userServicio = inject(SeguridadService);

  displayedColumns: string[] = ['id', 'nombre', 'rol', 'renta_mensual'];




}
