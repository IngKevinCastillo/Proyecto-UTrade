using System;
using System.Collections.Generic;

namespace Model;

public partial class Chat
{
    public string Id { get; set; } = null!;

    public string Usuario1Id { get; set; } = null!;

    public string Usuario2Id { get; set; } = null!;

    public DateTime FechaCreacion { get; set; }

    public virtual ICollection<Mensajes> Mensajes { get; set; } = new List<Mensajes>();

    public virtual Persona Usuario1 { get; set; } = null!;

    public virtual Persona Usuario2 { get; set; } = null!;
}
