using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Servicios.Contrato
{
    public interface IEstadosServicio
    {
        Task<List<EstadosDTO>> Listar();
        Task<EstadosDTO> Crear(EstadosDTO modelo);
        Task<bool> Editar(EstadosDTO modelo);
        Task<EstadosDTO> Buscar(string id);
        Task<bool> Eliminar(string id);
    }
}
