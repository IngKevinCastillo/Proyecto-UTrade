using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Servicios.Contrato
{
    public interface IRazonServicio
    {
        Task<List<RazonesDTO>> Listar();
        Task<RazonesDTO> Crear(RazonesDTO modelo);
        Task<bool> Editar(RazonesDTO modelo);
        Task<bool> Eliminar(string id);
        Task<RazonesDTO> Buscar(string id);
    }
}
