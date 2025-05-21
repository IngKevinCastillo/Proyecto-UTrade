using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class TiposReporteDTO
    {
        public string Id { get; set; }

        public string Nombre { get; set; }

        public virtual ICollection<ReportesDTO> Reportes { get; set; }
    }
}
