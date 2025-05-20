
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class SesionDTO
    {
        public string IdUsuario { get; set; }
        public string? Correo { get; set; }

        public string Contraseña { get; set; }

        public string? Telefono { get; set; }
    }
}
