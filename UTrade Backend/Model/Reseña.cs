using System;
using System.Collections.Generic;

namespace Model;

public partial class Reseña
{
    public string Id { get; set; } = null!;

    public int Calificacion { get; set; }

    public string? Comentario { get; set; }

    public string IdPublicacion { get; set; } = null!;

    public string IdPersona { get; set; } = null!;

    public virtual Persona IdPersonaNavigation { get; set; } = null!;

    public virtual Publicaciones IdPublicacionNavigation { get; set; } = null!;

    public virtual ICollection<Publicaciones> Publicaciones { get; set; } = new List<Publicaciones>();
}
