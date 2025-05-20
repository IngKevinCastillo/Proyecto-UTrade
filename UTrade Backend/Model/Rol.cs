using System;
using System.Collections.Generic;

namespace Model;

public partial class Rol
{
    public string Id { get; set; } = null!;

    public string Nombre { get; set; } = null!;

    public virtual ICollection<Persona> Personas { get; set; } = new List<Persona>();
}
