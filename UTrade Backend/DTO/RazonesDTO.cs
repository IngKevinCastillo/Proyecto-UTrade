using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class RazonesDTO
    {
        public string IdRazon { get; set; }

        public string Nombre { get; set; }

        public virtual ICollection<ContactanosDTO> Contactanos { get; set; }
    }
}
