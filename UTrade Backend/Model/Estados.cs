using System;
using System.Collections.Generic;

namespace Model;

public partial class Estados
{
    public string Id { get; set; } = null!;

    public string Nombre { get; set; } = null!;

    public virtual ICollection<Persona> Personas { get; set; } = new List<Persona>();

    public virtual ICollection<Publicaciones> Publicaciones { get; set; } = new List<Publicaciones>();
}
