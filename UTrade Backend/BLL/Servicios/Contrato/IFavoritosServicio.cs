using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Servicios.Contrato
{
    public interface IFavoritosServicio
    {
        Task<List<FavoritosDTO>> Listar();
        Task<FavoritosDTO> Crear(FavoritosDTO modelo);
        Task<FavoritosDTO> Buscar(string id);
        Task<FavoritosDTO> BuscarPorUsuario(string id);
        Task<FavoritosDTO> BuscarPorPublicacion(string id);
        Task<bool> Eliminar(string id);
        Task<bool> EliminarPorUsuario(string id);
        Task<bool> EliminarPorPublicacion(string id);
    }
}
