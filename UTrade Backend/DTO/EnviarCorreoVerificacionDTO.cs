using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class EnviarCorreoVerificacionDTO
    {
        public string CorreoDestino { get; set; }
        public string Asunto { get; set; }
        public string CodigoVerficacion { get; set; }
    }
}
