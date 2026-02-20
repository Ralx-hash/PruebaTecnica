import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SeguridadService } from './seguridadService';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const seguridadService = inject(SeguridadService);

  // Verificar si el usuario está logeado con el servicio de seguridad
  if (seguridadService.estaLogeado()) {
    
    return true;
  } else {
    return router.navigate(['/login']);
  }
};