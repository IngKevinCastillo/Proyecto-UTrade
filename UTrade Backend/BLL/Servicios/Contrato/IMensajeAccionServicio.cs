using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Servicios.Contrato
{
    public interface IMensajeAccionServicio
    {
        Task<List<MensajeAccionDTO>> Listar();
        Task<MensajeAccionDTO> Crear(MensajeAccionDTO modelo);
        Task<bool> Editar(MensajeAccionDTO modelo);
        Task<MensajeAccionDTO> Buscar(string id);
        Task<bool> Eliminar(string id);
    }
}
