using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Servicios.Contrato
{
    public interface IChatServicio
    {
        Task<string?> VerificarExistenciaChat(string idUsuario1, string idUsuario2);
        Task<string> GenerarId();
        Task<List<ChatDTO>> Listar();
        Task<ChatDTO> Crear(CrearChatDTO modelo);
        Task<ChatDTO> Buscar(string id);
        Task<bool> Eliminar(string id);
        Task<List<ChatDTO>> ListarPorIdPersona(string idUsuario);
    }
}
