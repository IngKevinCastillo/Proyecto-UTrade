using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Servicios.Contrato
{
    public interface ILikesServicio
    {
        Task<LikesDTO> Crear(LikesDTO modelo);
        Task<bool> Eliminar(string id);
    }
}
