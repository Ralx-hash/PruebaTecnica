import { Routes } from '@angular/router';
import { LoginComponent } from './seguridad/login/login.component';
import { HomeComponent } from './compartido/home/home.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent}
];
