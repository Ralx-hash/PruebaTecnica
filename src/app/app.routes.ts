import { Routes } from '@angular/router';
import { LoginComponent } from './seguridad/login/login.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { adminGuard } from './seguridad/loginGuard.guard';

export const routes: Routes = [
    //solo hay 2 rutas y una de ellas esta protegida por el guard
    {path: '', component: ListaUsuariosComponent, canActivate: [adminGuard]},
    {path: 'login', component: LoginComponent}
];
