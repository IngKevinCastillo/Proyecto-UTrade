using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class ReportesDTO
    {
        public string IdReporte { get; set; }

        public string IdTipoReporte { get; set; }

        public string IdEstado { get; set; }

        public DateTime FechaReportada { get; set; }

        public DateTime? FechaActualizacion { get; set; }

        public bool Leido { get; set; }

        public string IdReportante { get; set; }

        public string IdReportado { get; set; }

        public string IdMotivo { get; set; }

        public string? Descripcion { get; set; }

    }
}
