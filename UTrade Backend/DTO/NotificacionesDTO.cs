using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class NotificacionesDTO
    {
        public string Id { get; set; }

        public string IdPersona { get; set; }

        public string IdTipoAccion { get; set; } 

        public DateOnly Fecha { get; set; }

        public TimeOnly Hora { get; set; }

        public bool Estado { get; set; }

        public virtual PersonaDTO IdPersonaNavigation { get; set; }

        public virtual TipoAccionDTO IdTipoAccionNavigation { get; set; }
    }
}
