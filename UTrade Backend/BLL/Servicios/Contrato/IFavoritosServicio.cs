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
        Task<FavoritosDTO> Crear(FavoritosDTO modelo);
        Task<List<FavoritosDTO>> BuscarPorUsuario(string id);
        Task<bool> EliminarUsuarioPublicacion(string idUsuario, string idPublicacion);
        Task<bool> VerificarFavorito(string idUsuario, string idPublicacion);
    }
}
