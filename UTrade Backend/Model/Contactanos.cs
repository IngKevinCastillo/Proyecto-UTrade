using System;
using System.Collections.Generic;

namespace Model;

public partial class Contactanos
{
    public string Id { get; set; } = null!;

    public string IdPersona { get; set; } = null!;

    public string IdRazon { get; set; } = null!;

    public string Descripcion { get; set; } = null!;

    public virtual Persona IdPersonaNavigation { get; set; } = null!;

    public virtual Razones IdRazonNavigation { get; set; } = null!;
}
