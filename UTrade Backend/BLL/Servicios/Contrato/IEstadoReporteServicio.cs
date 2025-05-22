using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;

namespace BLL.Servicios.Contrato
{
    public interface IEstadoReporteServicio
    {
        Task<List<EstadosReporteDTO>> Listar();
        Task<EstadosReporteDTO> Crear(EstadosReporteDTO modelo);
        Task<bool> Editar(EstadosReporteDTO modelo);
        Task<EstadosReporteDTO> Buscar(string id);
        Task<bool> Eliminar(string id);
    }
}
