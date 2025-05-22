using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Servicios.Contrato
{
    public interface ITipoAccionServicio
    {
        Task<List<TipoAccionDTO>> Listar();
        Task<TipoAccionDTO> Crear(TipoAccionDTO modelo);
        Task<bool> Editar(TipoAccionDTO modelo);
        Task<TipoAccionDTO> Buscar(string id);
        Task<bool> Eliminar(string id);
    }
}
