using System;
using System.Collections.Generic;

namespace Model;

public partial class EstadosReporte
{
    public string Id { get; set; } = null!;

    public string Nombre { get; set; } = null!;

    public virtual ICollection<Reportes> Reportes { get; set; } = new List<Reportes>();
}
