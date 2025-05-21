using System;
using System.Collections.Generic;

namespace Model;

public partial class MensajeAccion
{
    public string Id { get; set; } = null!;

    public string Descripcion { get; set; } = null!;

    public virtual ICollection<TipoAccion> TipoAccions { get; set; } = new List<TipoAccion>();
}
