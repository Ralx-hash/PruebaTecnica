export function extraerErrores(obj: any): string[] {
    let mensajesDeError: string[] = [];

    // extraer errores para formato {"status": ..., "details": "..."}
    if (obj.detail) {
        mensajesDeError.push(obj.detail);
        return mensajesDeError;
    }

    //en caso de no recibir details envia un error generico
    mensajesDeError.push('Error desconocido');
    return mensajesDeError;
}
