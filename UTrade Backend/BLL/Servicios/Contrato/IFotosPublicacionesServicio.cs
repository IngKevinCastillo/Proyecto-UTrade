using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Servicios.Contrato
{
    public interface IFotosPublicacionesServicio
    {
        Task<List<FotosPublicacionesDTO>> Listar();
        Task<FotosPublicacionesDTO> Crear(FotosPublicacionesDTO modelo);
        Task<bool> Editar(FotosPublicacionesDTO modelo);
        Task<FotosPublicacionesDTO> Buscar(string id);
        Task<bool> Eliminar(string id);
    }
}
