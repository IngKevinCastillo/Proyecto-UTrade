using System;
using System.Collections.Generic;

namespace Model;

public partial class TipoAccion
{
    public string Id { get; set; } = null!;

    public string Nombre { get; set; } = null!;

    public string? Descripcion { get; set; }

    public virtual ICollection<Notificaciones> Notificaciones { get; set; } = new List<Notificaciones>();
}
