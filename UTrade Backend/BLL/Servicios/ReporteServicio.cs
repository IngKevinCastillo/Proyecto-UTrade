using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BLL.Servicios.Contrato;
using DAL.Repositorios.Contrato;
using DTO;
using Microsoft.EntityFrameworkCore;
using Model;

namespace BLL.Servicios
{
    public class ReporteServicio : IReporteServicio
    {
        private readonly IRepositorioGenerico<Reportes> _reporteRepositorio;
        private readonly IMapper _mapper;

        public ReporteServicio(IRepositorioGenerico<Reportes> reporteRepositorio, IMapper mapper)
        {
            _reporteRepositorio = reporteRepositorio;
            _mapper = mapper;
        }

        public async Task<ReportesDTO> Crear(ReportesDTO modelo)
        {
            try
            {
                var reporteCreado = await _reporteRepositorio.Crear(_mapper.Map<Reportes>(modelo));
                if (reporteCreado.IdReporte == null)
                    throw new Exception("No se pudo crear");
                return _mapper.Map<ReportesDTO>(reporteCreado);
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Actualizar(ReportesDTO modelo)
        {
            try
            {
                var reporteModelo = _mapper.Map<Reportes>(modelo);
                var reporteEncontrado = await _reporteRepositorio.Obtener(x => x.IdReporte == reporteModelo.IdReporte);

                if (reporteEncontrado == null)
                    throw new TaskCanceledException("Reporte no encontrado");

                reporteEncontrado.IdEstado = reporteModelo.IdEstado;
                reporteEncontrado.Leido = reporteModelo.Leido;
                reporteEncontrado.FechaActualizacion = reporteModelo.FechaActualizacion;

                bool respuesta = await _reporteRepositorio.Editar(reporteEncontrado);

                if (!respuesta)
                    throw new Exception("No se pudo editar el reporte");

                return respuesta;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<ReportesDTO>> Listar()
        {
            try
            {
                var queryUsuario = await _reporteRepositorio.Consultar();
                var listaReportes = queryUsuario.ToList();

                return _mapper.Map<List<ReportesDTO>>(listaReportes);
            }
            catch
            {
                throw;
            }
        }

        public async Task<ReportesDTO> ObtenerPorId(string id)
        {
            try
            {
                var reporte = await _reporteRepositorio.Obtener(x => x.IdReporte == id);

                if (reporte == null)
                    throw new TaskCanceledException("Reporte no encontrado");

                return _mapper.Map<ReportesDTO>(reporte);
            }
            catch
            {
                throw;
            }
        }
    }
}
