using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Servicios.Contrato
{
    public interface INotificacionServicio
    {
        Task<NotificacionesDTO> Crear(NotificacionesDTO modelo);
        Task<List<NotificacionesDTO>> ListarPorIdUsuario(string idUsuario);
        Task<bool> CambiarEstado(bool estado, NotificacionesDTO notificacion);
    }
}
