import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SeguridadService } from '../seguridad/seguridadService';
import { UsuarioListaDTO } from '../../models/users';
import { take } from 'rxjs';
import { PerfilComponent } from '../compartido/perfil/perfil.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-usuarios',
  imports: [MatToolbarModule, MatButtonModule, CommonModule, MatPaginatorModule, MatTableModule, MatDialogModule, 
    MatProgressSpinnerModule, MatRadioModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent implements OnInit{

  ngOnInit(): void {
    //se carga el perfil del usuario al entrar en la vista de listaUsuarios
    this.userServicio.obtenerPerfil().subscribe({
      next:(data) => {
        if(data.rol === 'admin' || data.rol === 'supervisor'){
          this.verificadorUsuario = true;
          this.rolActual = data.rol;
        }
        else{
          //esto es para no mostrar la lista a rol usuarios
          this.verificadorUsuario = false;
        }
      },      
      error: (err) => {
      }
    });

    //la lista de usuarios se carga independientemente del usuario
    //aunque por logica del backend, si tiene rol usuario solo traera su propio usuario, asi que no hay punto en
    //hacer que se vea la lista, ya que esta informacion puede verse en el dialog del perfil
    this.userServicio.obtenerUsuarios().pipe(take(1)).subscribe({
      next: (data) => {
        this.listaUsuarios = data;
        
        this.listaFiltrada = this.listaUsuarios;
      },
      error: (err) => {
      }
    });

    this.filtroNombre.valueChanges.subscribe(busqueda => {
      this.filtrarPorBusqueda(busqueda || '');
    });

    this.filtroRol.valueChanges.subscribe(rol => {
      this.aplicarFiltroRol(rol || 'todos');
      this.rolActualRadio = rol || 'todos';
      this.filtroNombre.setValue('');
    });
    
  }

  rolActualRadio: string = 'todos';

  filtroNombre = new FormControl('');

  filtroRol = new FormControl('todos');

  rolActual: string = '';

  verificadorUsuario: boolean = false;

  listaUsuarios: UsuarioListaDTO[] = [];

  listaFiltrada: UsuarioListaDTO[] = this.listaUsuarios;
  
  userServicio = inject(SeguridadService);

  displayedColumns: string[] = ['id', 'nombre', 'rol', 'renta_mensual'];

  dialog = inject(MatDialog);

  abrirDialog() {
    const dialogRef = this.dialog.open(PerfilComponent);
  }

  filtrarListaUsuarios(rol: string) {
    this.listaFiltrada = this.listaUsuarios.filter(usuario => usuario.rol === rol);
  }

  deseleccionarRadio(){
    this.listaFiltrada = this.listaUsuarios;
  }

  filtrarPorBusqueda(busqueda: string) {
      const termino = busqueda.toLowerCase();
      this.listaFiltrada = this.listaFiltrada.filter(usuario =>
        usuario.nombre.toLowerCase().includes(termino)
      );
      if (!busqueda.trim()){
        this.aplicarFiltroRol(this.rolActualRadio);
      }
  }

  aplicarFiltroRol(rol: string) {
    if (rol === 'todos') {
      this.listaFiltrada = this.listaUsuarios;
    } else {
      this.listaFiltrada = this.listaUsuarios.filter(usuario => usuario.rol === rol);
    }
  }



}
