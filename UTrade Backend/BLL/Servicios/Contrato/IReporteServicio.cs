using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;

namespace BLL.Servicios.Contrato
{
    public interface IReporteServicio
    {
        Task<List<ReportesDTO>> Listar();
        Task<ReportesDTO> Crear(ReportesDTO modelo);
        Task<bool> Actualizar(ReportesDTO modelo);
    }
}
