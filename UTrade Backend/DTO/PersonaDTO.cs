using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class PersonaDTO
    {
        public string Id { get; set; }

        public string Nombres { get; set; }

        public string Apellidos { get; set; }

        public DateOnly? FechaNacimiento { get; set; }

        public string Genero { get; set; }

        public string IdRol { get; set; }

        public string NombreUsuario { get; set; }

        public string Contraseña { get; set; }

        public string Correo { get; set; }

        public string? Telefono { get; set; }

        public string? FotoPerfil { get; set; }

        public virtual ICollection<ChatDTO> ChatUsuario1s { get; set; }

        public virtual ICollection<ChatDTO> ChatUsuario2s { get; set; }

        public virtual ICollection<ContactanosDTO> Contactanos { get; set; }

        public virtual ICollection<FavoritosDTO> Favoritos { get; set; }

        public virtual RolDTO IdRolNavigation { get; set; }

        public virtual ICollection<MensajesDTO> Mensajes { get; set; }

        public virtual ICollection<NotificacionesDTO> Notificaciones { get; set; }

        public virtual ICollection<PublicacionesDTO> Publicaciones { get; set; }

        public virtual ICollection<ReportesDTO> ReporteIdReportadoNavigations { get; set; }

        public virtual ICollection<ReportesDTO> ReporteIdReportanteNavigations { get; set; }

        public virtual ICollection<ReseñaDTO> Reseñas { get; set; }
    }
}
