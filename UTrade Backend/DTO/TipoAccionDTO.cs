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

        public string IdTipoMensaje { get; set; }

        public string IdPersonaRemitente { get; set; }

        public string IdPersonaReportada { get; set; }

        public virtual PersonaDTO IdPersonaRemitenteNavigation { get; set; }

        public virtual PersonaDTO IdPersonaReportadaNavigation { get; set; }

        public virtual MensajeAccionDTO IdTipoMensajeNavigation { get; set; }

        public virtual ICollection<NotificacionesDTO> Notificaciones { get; set; }
    }
}
