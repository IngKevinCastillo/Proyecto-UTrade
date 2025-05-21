using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class ChatDTO
    {
        public string Id { get; set; }

        public string Usuario1Id { get; set; }

        public string Usuario2Id { get; set; }

        public DateTime FechaCreacion { get; set; }

        public virtual ICollection<MensajesDTO> Mensajes { get; set; }

        public virtual PersonaDTO Usuario1 { get; set; }

        public virtual PersonaDTO Usuario2 { get; set; }
    }
}
