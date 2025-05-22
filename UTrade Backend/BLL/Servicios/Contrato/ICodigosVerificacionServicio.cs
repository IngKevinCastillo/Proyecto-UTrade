using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Servicios.Contrato
{
    public interface ICodigosVerificacionServicio
    {
        Task<List<CodigosVerificacionDTO>> Listar();
        Task<CodigosVerificacionDTO> Crear(CodigosVerificacionDTO modelo);
        Task<CodigosVerificacionDTO> Buscar(string id);
    }
}
