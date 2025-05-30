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
        public string? TipoId { get; set; }
    }
}
