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
        Task<List<ChatDTO>> Listar();
        Task<ChatDTO> Crear(ChatDTO modelo);
        Task<ChatDTO> Buscar(string id);
        Task<bool> Eliminar(string id);
    }
}
