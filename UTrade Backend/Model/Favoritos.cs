using System;
using System.Collections.Generic;

namespace Model;

public partial class Favoritos
{
    public string Id { get; set; } = null!;

    public string IdPersona { get; set; } = null!;

    public string IdPublicacion { get; set; } = null!;

    public virtual Persona IdPersonaNavigation { get; set; } = null!;

    public virtual Publicaciones IdPublicacionNavigation { get; set; } = null!;
}
