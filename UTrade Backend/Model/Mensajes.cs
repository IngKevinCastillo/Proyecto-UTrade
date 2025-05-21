using System;
using System.Collections.Generic;

namespace Model;

public partial class Mensajes
{
    public string Id { get; set; } = null!;

    public string ChatId { get; set; } = null!;

    public string AutorId { get; set; } = null!;

    public string Mensaje1 { get; set; } = null!;

    public DateTime Hora { get; set; }

    public virtual ICollection<ArchivosAdjuntos> ArchivosAdjuntos { get; set; } = new List<ArchivosAdjuntos>();

    public virtual Persona Autor { get; set; } = null!;

    public virtual Chat Chat { get; set; } = null!;
}
