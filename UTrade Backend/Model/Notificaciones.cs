using System;
using System.Collections.Generic;

namespace Model;

public partial class Notificaciones
{
    public string Id { get; set; } = null!;

    public string IdPersona { get; set; } = null!;

    public string IdTipoAccion { get; set; } = null!;

    public DateOnly Fecha { get; set; }

    public TimeOnly Hora { get; set; }

    public virtual Persona IdPersonaNavigation { get; set; } = null!;

    public virtual TipoAccion IdTipoAccionNavigation { get; set; } = null!;
}
