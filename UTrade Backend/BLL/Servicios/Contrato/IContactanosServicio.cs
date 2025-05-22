using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Servicios.Contrato
{
    public interface IContactanosServicio
    {
        Task<ContactanosDTO> Crear(ContactanosDTO modelo);
        Task<bool> Editar(ContactanosDTO modelo);
        Task<ContactanosDTO> Buscar(string id);
        Task<bool> Eliminar(string id);
        Task<List<ContactanosDTO>> Listar();
        Task<bool> EnviarCorreo(string correoDestino, string asunto, string mensaje, RazonesDTO razon, string correoRespuesta);

    }
}
