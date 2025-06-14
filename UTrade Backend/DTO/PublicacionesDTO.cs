﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class PublicacionesDTO
    {
        public string Id { get; set; }

        public string Titulo { get; set; } 

        public DateTime FechaPublicacion { get; set; }

        public string IdUsuario { get; set; }

        public decimal? Precio { get; set; }

        public string? IdCategoria { get; set; }

        public string Descripcion { get; set; }

        public string? IdEstado { get; set; }

        public string? Direccion { get; set; }

        public decimal? Altitud { get; set; }

        public decimal? Latitud { get; set; }
        public List<FotosPublicacionesDTO>? fotosPublicaciones { get; set; }

    }
}
