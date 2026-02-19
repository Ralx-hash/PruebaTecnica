import { Component, inject } from '@angular/core';
import { SeguridadService } from '../seguridadService';

@Component({
  selector: 'app-autorizar',
  imports: [],
  templateUrl: './autorizar.component.html',
  styleUrl: './autorizar.component.css'
})
export class AutorizarComponent {
  seguridadService = inject(SeguridadService);

  estaLogeado(): boolean {
    return this.seguridadService.estaLogeado();
  }
}
