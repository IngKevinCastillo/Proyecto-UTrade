using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class MensajesDTO
    {
        public string Id { get; set; }

        public string ChatId { get; set; }

        public string AutorId { get; set; }

        public string Mensaje1 { get; set; }

        public DateTime Hora { get; set; }

        public virtual ICollection<ArchivosAdjuntosDTO> ArchivosAdjuntos { get; set; }

        public virtual PersonaDTO Autor { get; set; }

        public virtual ChatDTO Chat { get; set; } 
    }
}
