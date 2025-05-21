using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class TipoAccionDTO
    {
        public string Id { get; set; }

        public string Nombre { get; set; }

        public string? Descripcion { get; set; }

        public virtual ICollection<NotificacionesDTO> Notificaciones { get; set; }
    }
}
