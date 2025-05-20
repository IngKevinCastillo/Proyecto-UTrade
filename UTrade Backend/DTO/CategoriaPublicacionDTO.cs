using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class CategoriaPublicacionDTO
    {
        public string Id { get; set; }

        public string Nombre { get; set; }

        public virtual ICollection<PublicacionesDTO> Publicaciones { get; set; }
    }
}
