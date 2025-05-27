using System;
using System.Collections.Generic;

namespace Model;

public partial class Likes
{
    public string Id { get; set; } = null!;

    public string IdReseña { get; set; } = null!;

    public string IdPersona { get; set; } = null!;

    public virtual Persona IdPersonaNavigation { get; set; } = null!;

    public virtual Reseña IdReseñaNavigation { get; set; } = null!;
}
