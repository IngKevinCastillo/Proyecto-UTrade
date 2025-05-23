export interface Reporte {
    idReporte: string,
    idTipoReporte: string,
    idEstado: string,
    fechaReportada: Date,
    fechaActualizacion: Date,
    leido: boolean,
    idReportante: string,
    idReportado: string,
    idMotivo: string,
    descripcion: string
}