using System;
using System.Collections.Generic;

namespace Model;

public partial class Razones
{
    public string IdRazon { get; set; } = null!;

    public string Nombre { get; set; } = null!;

    public virtual ICollection<Contactanos> Contactanos { get; set; } = new List<Contactanos>();
}
