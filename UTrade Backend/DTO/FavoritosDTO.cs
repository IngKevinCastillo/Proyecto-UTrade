using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class FavoritosDTO
    {
        public string Id { get; set; }

        public string IdPersona { get; set; }

        public string IdPublicacion { get; set; }

        public virtual PersonaDTO IdPersonaNavigation { get; set; }

        public virtual PublicacionesDTO IdPublicacionNavigation { get; set; }
    }
}
