using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class CodigosVerificacionDTO
    {
        public string Id { get; set; } 

        public string Codigo { get; set; } 

        public TimeOnly Hora { get; set; }
    }
}
