using System;
using System.Collections.Generic;

namespace Model;

public partial class CodigosVerificacion
{
    public string Id { get; set; } = null!;

    public string Codigo { get; set; } = null!;

    public TimeOnly Hora { get; set; }
}
