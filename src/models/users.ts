export interface UserLogin{
    email: string;
    password: string;
}

export interface RespuestaAutenticacionDTO {
    access_token: string;
    token_type: string;
    expiration: string;  // viene como string desde el servidor
}

export interface UsuarioListaDTO {
    id: number;
    nombre: string;
    email: string;
}