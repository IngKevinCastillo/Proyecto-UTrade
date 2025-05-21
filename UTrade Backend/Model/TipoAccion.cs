using System;
using System.Collections.Generic;

namespace Model;

public partial class TipoAccion
{
    public string Id { get; set; } = null!;

    public string IdTipoMensaje { get; set; } = null!;

    public string IdPersonaRemitente { get; set; } = null!;

    public virtual Persona IdPersonaRemitenteNavigation { get; set; } = null!;

    public virtual MensajeAccion IdTipoMensajeNavigation { get; set; } = null!;

    public virtual ICollection<Notificaciones> Notificaciones { get; set; } = new List<Notificaciones>();
}
