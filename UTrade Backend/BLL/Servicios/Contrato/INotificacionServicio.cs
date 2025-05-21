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
        Task<List<NotificacionesDTO>> Listar();
        Task<NotificacionesDTO> Crear(NotificacionesDTO modelo);
        Task<bool> Editar(NotificacionesDTO modelo);
        Task<NotificacionesDTO> Buscar(string id);
        Task<bool> Eliminar(string id);
    }
}
