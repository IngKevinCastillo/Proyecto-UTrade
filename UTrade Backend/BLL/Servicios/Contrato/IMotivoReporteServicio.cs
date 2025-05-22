using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;

namespace BLL.Servicios.Contrato
{
    public interface IMotivoReporteServicio
    {
        Task<List<MotivosReporteDTO>> Listar();
        Task<MotivosReporteDTO> Crear(MotivosReporteDTO modelo);
        Task<bool> Editar(MotivosReporteDTO modelo);
        Task<MotivosReporteDTO> Buscar(string id);
        Task<bool> Eliminar(string id);
    }
}
