using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Servicios.Contrato
{
    public interface IUsuarioServicio
    {
        Task<List<PersonaDTO>> Listar();
        Task<SesionDTO> ValidarCredenciales(string correo, string? telefono, string clave);
        Task<PersonaDTO> Crear(PersonaDTO modelo);
        Task<bool> Editar(PersonaDTO modelo);
        Task<bool> Eliminar(string id);
    }
}
