using System;
using System.Collections.Generic;

namespace Model;

public partial class Reportes
{
    public string IdReporte { get; set; } = null!;

    public string IdTipoReporte { get; set; } = null!;

    public string IdEstado { get; set; } = null!;

    public DateTime FechaReportada { get; set; }

    public DateTime? FechaActualizacion { get; set; }

    public bool Leido { get; set; }

    public string IdReportante { get; set; } = null!;

    public string IdReportado { get; set; } = null!;

    public string IdMotivo { get; set; } = null!;

    public string? Descripcion { get; set; }

    public virtual EstadosReporte IdEstadoNavigation { get; set; } = null!;

    public virtual MotivosReporte IdMotivoNavigation { get; set; } = null!;

    public virtual Persona IdReportadoNavigation { get; set; } = null!;

    public virtual Persona IdReportanteNavigation { get; set; } = null!;

    public virtual TiposReporte IdTipoReporteNavigation { get; set; } = null!;
}
