export function extraerErrores(obj: any): string[] {
    let mensajesDeError: string[] = [];

    console.log('Objeto de error recibido:', obj); // Agrega este log para ver el objeto de error
    // capturar errores para formato {"status": ..., "details": "..."} el cual es el formato
    //con el que se estan enviando los errores en el backend
    if (obj.error) {
        mensajesDeError.push(obj.error.detail);
        return mensajesDeError;
    }


    //en caso de no recibir details envia un error generico
    mensajesDeError.push('Error desconocido');
    return mensajesDeError;
}
