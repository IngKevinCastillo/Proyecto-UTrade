using System;
using System.Collections.Generic;

namespace Model;

public partial class Publicaciones
{
    public string Id { get; set; } = null!;

    public string Titulo { get; set; } = null!;

    public DateTime FechaPublicacion { get; set; }

    public string IdUsuario { get; set; } = null!;

    public decimal? Precio { get; set; }

    public string? IdCategoria { get; set; }

    public string? Descripcion { get; set; }

    public string? Ubicacion { get; set; }

    public string? IdReseña { get; set; }

    public string? IdEstado { get; set; }

    public string? Direccion { get; set; }

    public virtual ICollection<Favoritos> Favoritos { get; set; } = new List<Favoritos>();

    public virtual ICollection<FotosPublicaciones> FotosPublicaciones { get; set; } = new List<FotosPublicaciones>();

    public virtual CategoriaPublicacion? IdCategoriaNavigation { get; set; }

    public virtual Estados? IdEstadoNavigation { get; set; }

    public virtual Reseña? IdReseñaNavigation { get; set; }

    public virtual Persona IdUsuarioNavigation { get; set; } = null!;

    public virtual ICollection<Reseña> Reseñas { get; set; } = new List<Reseña>();
}
