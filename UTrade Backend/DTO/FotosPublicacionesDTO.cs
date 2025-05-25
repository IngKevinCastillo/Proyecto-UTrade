using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class FotosPublicacionesDTO
    {
        public string Id { get; set; }

        public byte[] Foto { get; set; }

        public string? FotoBase64 { get; set; }

        public string IdPublicacion { get; set; }
    }
}
