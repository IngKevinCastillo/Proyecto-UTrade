using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class ContactanosDTO
    {
        public string Id { get; set; }

        public string IdPersona { get; set; }

        public string IdRazon { get; set; }

        public string Descripcion { get; set; }

        public virtual PersonaDTO IdPersonaNavigation { get; set; }

        public virtual RazonesDTO IdRazonNavigation { get; set; }
    }
}
