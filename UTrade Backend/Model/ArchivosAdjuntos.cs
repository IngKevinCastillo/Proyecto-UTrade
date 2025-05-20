using System;
using System.Collections.Generic;

namespace Model;

public partial class ArchivosAdjuntos
{
    public string Id { get; set; } = null!;

    public byte[] Archivo { get; set; } = null!;

    public string IdMensaje { get; set; } = null!;

    public virtual Mensajes IdMensajeNavigation { get; set; } = null!;
}
