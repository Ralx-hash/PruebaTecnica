import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/enviroment.development';
import { Router } from '@angular/router';
import { UserLogin, RespuestaAutenticacionDTO, UsuarioListaDTO } from '../../models/users';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  private http = inject(HttpClient);
  private urlbase = environment.apiUrl + '/users';
  private readonly token = 'token';
  private readonly expiracion = 'token-expiracion';
  private routerlink = inject(Router)

  //envia las credenciales al backend para obtener el token de autenticacion y la expiracion del token, llama a guardartoken con la respuesta de la api
  Login(credenciales: UserLogin): Observable<RespuestaAutenticacionDTO> {
    return this.http.post<RespuestaAutenticacionDTO>(`${this.urlbase}/login`, credenciales)
    .pipe(tap(response_autenticacion => {
      this.guardarToken(response_autenticacion);
    }));
  }

  obtenerUsuarios(): Observable<UsuarioListaDTO[]> {
    return this.http.get<UsuarioListaDTO[]>(`${this.urlbase}/users-filtered`)
    .pipe(tap(listaUsuarios => {console.log(listaUsuarios)}));
  }

  //guardar token y expiracion en localstorage
  guardarToken(RespuestaAutentica: RespuestaAutenticacionDTO){
    localStorage.setItem(this.token, RespuestaAutentica.access_token);
    localStorage.setItem(this.expiracion, RespuestaAutentica.expiration);
  }

   //obtener el token de localStorage
  obtenerToken(): string | null {
    return localStorage.getItem(this.token);
  }

  //verifika si el token existe y si no ha expirado, si ha expirado se elimina el token y se redirige al login
  estaLogeado(): boolean {
    const token = localStorage.getItem(this.token);
    if (!token) {
      return false;
    }

    const expiracion = localStorage.getItem(this.expiracion)!;
    const expiracionDate = new Date(expiracion);

    if (expiracionDate < new Date()) {
      this.logout();
      return false;
    }

    return true;
  }

  obtenerCampoJWT(campo: string): any { //esto es para sacar datos del token (email, rol, etc)
    const token = localStorage.getItem(this.token);
    if (!token) {
      return '';
    }
    var datatoken = JSON.parse(atob(token.split('.')[1]));
    return datatoken[campo];
  }

  logout(): void {
    localStorage.removeItem(this.token);
    localStorage.removeItem(this.expiracion);
    this.routerlink.navigate(['/login']);
  }

}
