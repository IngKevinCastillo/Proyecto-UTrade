using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Servicios.Contrato
{
    public interface IPublicacionesServicio
    {
        Task<List<PublicacionesDTO>> Listar();
        Task<List<PublicacionesDTO>>ListarSoloConLongitudLatitud();
        Task<PublicacionesDTO> Crear(PublicacionesDTO modelo);
        Task<bool> Editar(PublicacionesDTO modelo);
        Task<PublicacionesDTO> Buscar(string id);
        Task<bool> Eliminar(string id);
        Task<List<PublicacionesDTO>> ListarPorCategoria(string idCategoria);
        Task<List<FotosPublicacionesDTO>> FotosPublicaciones(string idPublicacion);
        Task<string> ObtenerIdNuevaPublicacion();
        Task<List<PublicacionesDTO>> ListarPorUsuario(string id);
        Task<List<PublicacionesDTO>> listarActivos();
    }
}
