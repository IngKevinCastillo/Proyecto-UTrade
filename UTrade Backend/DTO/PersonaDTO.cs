using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class PersonaDTO
    {
        public string Id { get; set; }

        public string Nombres { get; set; }

        public string Apellidos { get; set; }

        public DateOnly? FechaNacimiento { get; set; }

        public string? Genero { get; set; }

        public string IdRol { get; set; }

        public string NombreUsuario { get; set; }

        public string Contraseña { get; set; }

        public string? Correo { get; set; }

        public string? Telefono { get; set; }

        public byte[]? FotoPerfil { get; set; }
    }
}
