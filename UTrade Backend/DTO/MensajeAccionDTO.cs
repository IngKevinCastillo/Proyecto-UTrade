using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class MensajeAccionDTO
    {
        public string Id { get; set; }

        public string Descripcion { get; set; } 

        public virtual ICollection<TipoAccionDTO> TipoAccions { get; set; } 
    }
}
