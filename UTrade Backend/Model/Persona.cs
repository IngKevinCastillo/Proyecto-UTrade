using System;
using System.Collections.Generic;

namespace Model;

public partial class Persona
{
    public string Id { get; set; } = null!;

    public string Nombres { get; set; } = null!;

    public string Apellidos { get; set; } = null!;

    public DateOnly? FechaNacimiento { get; set; }

    public string? Genero { get; set; }

    public string IdRol { get; set; } = null!;

    public string NombreUsuario { get; set; } = null!;

    public string Contraseña { get; set; } = null!;

    public string? Correo { get; set; }

    public string? Telefono { get; set; }

    public byte[]? FotoPerfil { get; set; }

    public virtual ICollection<Chat> ChatUsuario1s { get; set; } = new List<Chat>();

    public virtual ICollection<Chat> ChatUsuario2s { get; set; } = new List<Chat>();

    public virtual ICollection<Contactanos> Contactanos { get; set; } = new List<Contactanos>();

    public virtual ICollection<Favoritos> Favoritos { get; set; } = new List<Favoritos>();

    public virtual Rol IdRolNavigation { get; set; } = null!;

    public virtual ICollection<Mensajes> Mensajes { get; set; } = new List<Mensajes>();

    public virtual ICollection<Notificaciones> Notificaciones { get; set; } = new List<Notificaciones>();

    public virtual ICollection<Publicaciones> Publicaciones { get; set; } = new List<Publicaciones>();

    public virtual ICollection<Reportes> ReporteIdReportadoNavigations { get; set; } = new List<Reportes>();

    public virtual ICollection<Reportes> ReporteIdReportanteNavigations { get; set; } = new List<Reportes>();

    public virtual ICollection<Reseña> Reseñas { get; set; } = new List<Reseña>();

    public virtual ICollection<TipoAccion> TipoAccionIdPersonaRemitenteNavigations { get; set; } = new List<TipoAccion>();

    public virtual ICollection<TipoAccion> TipoAccionIdPersonaReportadaNavigations { get; set; } = new List<TipoAccion>();
}
