import { Component, inject, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { SeguridadService } from '../../../seguridad/seguridadService';
import { AutorizarComponent } from '../../../seguridad/autorizar/autorizar.component';

@Component({
  selector: 'app-barra-superior',
  imports: [MatToolbarModule, MatButtonModule, RouterLink, MatIconModule,AutorizarComponent],
  templateUrl: './barra-superior.component.html',
  styleUrl: './barra-superior.component.css'
})
export class BarraSuperiorComponent {

  userServicio = inject(SeguridadService)
  email: string = '';


}
