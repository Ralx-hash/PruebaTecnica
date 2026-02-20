import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SeguridadService } from '../seguridad/seguridadService';
import { UsuarioListaDTO } from '../../models/users';
import { take } from 'rxjs';
import { PerfilComponent } from '../compartido/perfil/perfil.component';

@Component({
  selector: 'app-lista-usuarios',
  imports: [MatToolbarModule, MatButtonModule, CommonModule, MatPaginatorModule, MatTableModule, MatDialogModule],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent implements OnInit{

  ngOnInit(): void {
    this.userServicio.obtenerPerfil().subscribe({
      next:(data) => {
        if(data.rol === 'admin' || data.rol === 'supervisor'){
          this.verificadorUsuario = true;
          console.log('Usuario tiene permisos de admin/supervisor');
        }
        else{
          this.verificadorUsuario = false;
          console.log('Usuario no tiene permisos');
        }
      },      
      error: (err) => {
        console.error('Error al obtener perfil', err);
      }
    });


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

  verificadorUsuario: boolean = false;

  listaUsuarios: UsuarioListaDTO[] = [];
  
  userServicio = inject(SeguridadService);

  displayedColumns: string[] = ['id', 'nombre', 'rol', 'renta_mensual'];

  dialog = inject(MatDialog);

  abrirDialog() {
    const dialogRef = this.dialog.open(PerfilComponent);
  }




}
