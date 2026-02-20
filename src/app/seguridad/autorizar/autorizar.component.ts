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

  //autorizarComponent se encarga de verificar si el usuario esta logeado o no, para mostrar
  //ciertas partes de un componentes (en este caso, el email y el boton de logout en la barra superior)
  estaLogeado(): boolean {
    return this.seguridadService.estaLogeado();
  }
}
