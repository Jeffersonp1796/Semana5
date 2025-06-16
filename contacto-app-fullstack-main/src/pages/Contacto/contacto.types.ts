export interface ContactoForm {
  id: number;
  nombre: string;
  correo: string;
  mensaje: string;
  fecha: string;
}

export interface ContactoRequest {
  nombre: string;
  correo: string;
  mensaje: string;
}
