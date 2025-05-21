using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Servicios.Contrato
{
    public interface IRolServicio
    {
        Task<List<RolDTO>> Listar();
        Task<RolDTO> Crear(RolDTO modelo);
        Task<bool> Editar(RolDTO modelo);
        Task<bool> Eliminar(string id);
    }
}
