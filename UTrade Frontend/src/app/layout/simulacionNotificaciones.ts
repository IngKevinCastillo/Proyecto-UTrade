export class Notificaciones {
  id: number;
  nombre: string;
  descripcion: string;
  tipo: string;
  fecha: Date;

  constructor(
    id: number,
    nombre: string,
    descripcion: string,
    tipo: string,
    fecha: Date
  ) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.tipo = tipo;
    this.fecha = fecha;
  }
}

export const notificacionesLista: Notificaciones[] = [
    new Notificaciones(1, "Juan Pérez", "Te ha enviado una solicitud de un producto", "solicitud", new Date("2025-04-28")),
    new Notificaciones(2, "Ana Gómez", "Te ha enviado un mensaje", "mensaje", new Date("2025-04-29")),
    new Notificaciones(3, "Carlos López", "Ha ralizado un reporte", "reporte", new Date("2025-04-30")),
    new Notificaciones(4, "María Rodríguez", "Te ha enviado una solicitud de un producto", "solicitud", new Date("2025-05-01")),
    new Notificaciones(5, "Luis Fernández", "Ha realizado una compra", "compra", new Date("2025-05-02")),
    new Notificaciones(6, "Laura Martínez", "Ha respondido una encuesta", "encuesta", new Date("2025-05-03")),
    new Notificaciones(7, "Pedro Sánchez", "Te ha enviado un mensaje", "mensaje", new Date("2025-05-04"))
]