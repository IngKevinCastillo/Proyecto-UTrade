﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class ReseñaDTO
    {
        public string Id { get; set; }

        public int Calificacion { get; set; }

        public string? Comentario { get; set; }

        public string IdPublicacion { get; set; }

        public string IdPersona { get; set; }

        public DateTime Fecha { get; set; }

        public bool Verificado { get; set; }

        public virtual ICollection<LikesDTO>? Likes { get; set; }
    }
}
