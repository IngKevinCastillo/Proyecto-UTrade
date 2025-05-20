using System;
using System.Collections.Generic;

namespace Model;

public partial class CategoriaPublicacion
{
    public string Id { get; set; } = null!;

    public string Nombre { get; set; } = null!;

    public virtual ICollection<Publicaciones> Publicaciones { get; set; } = new List<Publicaciones>();
}
