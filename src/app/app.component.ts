import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarraSuperiorComponent } from './compartido/componente/barra-superior/barra-superior.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BarraSuperiorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Login-prueba';
}
