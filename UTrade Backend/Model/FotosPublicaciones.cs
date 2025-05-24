using System;
using System.Collections.Generic;

namespace Model;

public partial class FotosPublicaciones
{
    public string Id { get; set; } = null!;

    public byte[] Foto { get; set; } = null!;

    public string IdPublicacion { get; set; } = null!;

    public virtual Publicaciones IdPublicacionNavigation { get; set; } = null!;
}
