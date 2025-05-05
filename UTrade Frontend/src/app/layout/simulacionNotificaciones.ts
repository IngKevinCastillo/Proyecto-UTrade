export class Notificaciones {
  id: number;
  nombre: string;
  descripcion: string;
  tipo: string;

  constructor(
    id: number,
    nombre: string,
    descripcion: string,
    tipo: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.tipo = tipo;
  }
}

export const notificacionesLista: Notificaciones[] = [
    new Notificaciones(1, "Juan Pérez", "Te ha enviado una solicitud de un producto", "solicitud"),
    new Notificaciones(2, "Ana Gómez", "Te ha enviado un mensaje", "mensaje"),
    new Notificaciones(3, "Carlos López", "Ha ralizado un reporte", "reporte"),
    new Notificaciones(4, "María Rodríguez", "Te ha enviado una solicitud de un producto", "solicitud"),
    new Notificaciones(5, "Luis Fernández", "Ha realizado una compra", "compra"),
    new Notificaciones(6, "Laura Martínez", "Ha respondido una encuesta", "encuesta")
]