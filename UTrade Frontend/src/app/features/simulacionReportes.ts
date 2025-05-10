export class Reporte {
  id: number;
  titulo: string;
  tipo: string; 
  descripcion: string;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  leido: boolean; 
  estado: string; 
  idAnuncioReportado: number; 
  idReportante: number; 
  motivo: string; 

  constructor(
    id: number,
    titulo: string,
    tipo: string,
    descripcion: string,
    fechaCreacion: Date,
    fechaActualizacion: Date,
    leido: boolean,
    estado: string,
    idAnuncioReportado: number,
    idReportante: number,
    motivo: string
  ) {
    this.id = id;
    this.titulo = titulo;
    this.tipo = tipo;
    this.descripcion = descripcion;
    this.fechaCreacion = fechaCreacion;
    this.fechaActualizacion = fechaActualizacion;
    this.leido = leido; 
    this.estado = estado;
    this.idAnuncioReportado = idAnuncioReportado;
    this.idReportante = idReportante;
    this.motivo = motivo;
  }
}

export const listaReportes: Reporte[] = [
  new Reporte(
    1,
    "Comportamiento inapropiado",
    "usuario",
    "El usuario usó lenguaje ofensivo durante la conversación.",
    new Date("2025-05-01T10:00:00"),
    new Date("2025-05-01T10:00:00"),
    false, 
    "pendiente",
    23, 
    45, 
    "Lenguaje ofensivo"
  ),
  new Reporte(
    2,
    "Anuncio fraudulento",
    "anuncio",
    "El anuncio ofrece un producto inexistente y solicita pagos por adelantado.",
    new Date("2025-05-03T12:30:00"),
    new Date("2025-05-04T09:00:00"),
    true, 
    "en revisión",
    87, 
    45,
    "Fraude"
  ),
  new Reporte(
    3,
    "Contenido ofensivo en anuncio",
    "anuncio",
    "El título del anuncio contiene lenguaje inapropiado.",
    new Date("2025-05-02T15:00:00"),
    new Date("2025-05-05T11:45:00"),
    false,
    "resuelto",
    102,
    61,
    "Lenguaje inapropiado"
  )
];

