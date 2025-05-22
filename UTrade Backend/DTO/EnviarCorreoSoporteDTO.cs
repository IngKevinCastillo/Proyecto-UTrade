using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class EnviarCorreoSoporteDTO
    {
        public string CorreoDestino { get; set; }
        public string Asunto { get; set; }
        public string Mensaje { get; set; }
        public RazonesDTO Razon { get; set; }
        public string CorreoRespuesta { get; set; }
    }
}
