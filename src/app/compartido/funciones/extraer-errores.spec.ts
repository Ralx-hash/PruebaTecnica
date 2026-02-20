import { extraerErrores } from "./extraer-errores";

describe('extraerErrores', () => {
    let extraerErroresFunc: typeof extraerErrores;

    beforeEach(() => {
        extraerErroresFunc = extraerErrores;
    });

    it('debería extraer el mensaje de error del formato esperado', () => {
        const errorResponse = {
            "headers": "...",
            "error": {"status_code": 400, "detail": "error de validacion"},
            "status": 400,
            "statusText": "Bad Request",
            "url": "http://localhost:8000/login"
        }
        const resultado = extraerErroresFunc(errorResponse);
        expect(resultado).toEqual(['error de validacion']);
    })

    it('debería devolver un mensaje genérico si no se encuentra el formato esperado', () => {
        const errorResponse = {
            "headers": "...",
            "status": 500,
            "statusText": "Internal Server Error",
            "url": "http://localhost:8000/login"
        }
        const resultado = extraerErroresFunc(errorResponse);
        expect(resultado).toEqual(['Error desconocido']);
    })
});
