using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;

namespace BLL.Servicios.Contrato
{
    public interface ITipoReporteServicio
    {
        Task<List<TiposReporteDTO>> Listar();
        Task<TiposReporteDTO> Crear(TiposReporteDTO modelo);
        Task<bool> Editar(TiposReporteDTO modelo);
        Task<TiposReporteDTO> Buscar(string id);
        Task<bool> Eliminar(string id);
    }
}
