using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Servicios.Contrato
{
    public interface IRegistroServicio
    {
        Task<string> GenerarCodigoRegistro(DateTime fechaNacimiento);
        Task<bool> EnviarCorreoVerificacion(EnviarCorreoVerificacionDTO datos);
        Task<bool> ValidarCodigoRegistro(string codigoRegistro, string codigoRecibido);
    }
}
