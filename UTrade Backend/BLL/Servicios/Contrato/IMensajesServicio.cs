using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Servicios.Contrato
{
    public interface IMensajesServicio
    {
        Task<string> GenerarId();
        Task<List<MensajesDTO>> Listar();
        Task<MensajesDTO> Crear(CrearMensajeDTO modelo);
        Task<MensajesDTO> Buscar(string id);
        Task<bool> Eliminar(string id);
        Task<List<MensajesDTO>> ListarPorIdChat(string idChat);
        Task<MensajesDTO> ObtenerMensajeMasReciente(string idChat);
    }
}
