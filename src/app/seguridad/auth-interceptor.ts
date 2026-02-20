import { HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { SeguridadService } from "./seguridadService";

//interceptor para agregar el token al header de cada peticion
//sin esto tendria que agregar el header manualmente en cada peticion del servicio
export const authInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
) => {
    const seguridadService = inject(SeguridadService);
    const token = seguridadService.obtenerToken();

    if (token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    return next(req)
}