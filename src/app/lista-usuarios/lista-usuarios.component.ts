import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SeguridadService } from '../seguridad/seguridadService';

@Component({
  selector: 'app-lista-usuarios',
  imports: [MatToolbarModule, MatButtonModule,CommonModule, MatPaginatorModule],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent {
  
  userServicio = inject(SeguridadService);

  displayedColumns: string[] = ['id', 'name', 'email', "renta Mensual"];


}
