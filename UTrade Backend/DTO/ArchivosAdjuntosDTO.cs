﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class ArchivosAdjuntosDTO
    {
        public string Id { get; set; }

        public byte[] Archivo { get; set; }

        public string IdMensaje { get; set; }
    }
}
