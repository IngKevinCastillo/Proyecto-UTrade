using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Servicios.Contrato
{
    public interface IReseniaServicio
    {
        Task<List<ReseñaDTO>> Listar();
        Task<ReseñaDTO> Crear(ReseñaDTO modelo);
        Task<bool> Editar(ReseñaDTO modelo);
        Task<ReseñaDTO> Buscar(string id);
        Task<bool> Eliminar(string id);
        Task<List<ReseñaDTO>> ListarPorPublicacion(string idPublicacion);
        Task<List<ReseñaDTO>> ListarPorPersona(string idPersona);
        Task<List<ReseñaDTO>> ListarPorCalificacion(int calificacion);
    }
}
