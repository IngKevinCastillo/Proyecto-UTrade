using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Servicios.Contrato
{
    public interface INotificacionesServicio
    {
        Task<NotificacionesDTO> Crear(NotificacionesDTO modelo);
        Task<List<NotificacionesDTO>> ListarPorIdUsuario(string idUsuario);
        Task<List<NotificacionesDTO>> Buscar(string id);
        Task<NotificacionesDTO> CambiarEstadio(string id, bool estado);
    }
}
