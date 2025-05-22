using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BLL.Servicios.Contrato;
using DAL.Repositorios.Contrato;
using DTO;
using Model;

namespace BLL.Servicios
{
    public class EstadoReporteServicio : IEstadoReporteServicio
    {
        private readonly IRepositorioGenerico<EstadosReporte> _estadoReporteRepositorio;
        private readonly IMapper _mapper;
        public EstadoReporteServicio(IRepositorioGenerico<EstadosReporte> estadoReporteRepositorio, IMapper mapper)
        {
            _estadoReporteRepositorio = estadoReporteRepositorio;
            _mapper = mapper;
        }

        public async Task<EstadosReporteDTO> Crear(EstadosReporteDTO modelo)
        {
            try
            {
                var EstadoReporteCreado = await _estadoReporteRepositorio.Crear(_mapper.Map<EstadosReporte>(modelo));
                if (EstadoReporteCreado.Id == null)
                    throw new Exception("No se pudo crear");
                return _mapper.Map<EstadosReporteDTO>(EstadoReporteCreado);
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(EstadosReporteDTO modelo)
        {
            try
            {
                var estadoReporteModelo = _mapper.Map<EstadosReporte>(modelo);
                var estadoReporteEncontrado = await _estadoReporteRepositorio.Obtener(x => x.Id == modelo.Id);
                if (estadoReporteEncontrado == null)
                    throw new TaskCanceledException("El estado no existe");
                estadoReporteEncontrado.Nombre = estadoReporteModelo.Nombre;
                bool respuesta = await _estadoReporteRepositorio.Editar(estadoReporteEncontrado);
                if (!respuesta)
                    throw new TaskCanceledException("No se pudo editar");
                return respuesta;
            }
            catch
            {
                throw;
            }
        }

        public async Task<EstadosReporteDTO> Buscar(string id)
        {

            try
            {
                var queryRol = await _estadoReporteRepositorio.Obtener(x => x.Id == id);

                return _mapper.Map<EstadosReporteDTO>(queryRol);
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Eliminar(string id)
        {
            try
            {
                var estadoReporteEncontrado = await _estadoReporteRepositorio.Obtener(x => x.Id == id);
                if (estadoReporteEncontrado == null)
                    throw new TaskCanceledException("El tipo de reporte no existe");
                bool respuesta = await _estadoReporteRepositorio.Eliminar(estadoReporteEncontrado);
                if (!respuesta)
                    throw new TaskCanceledException("No se pudo eliminar");
                return respuesta;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<EstadosReporteDTO>> Listar()
        {
            try
            {
                var queryRol = await _estadoReporteRepositorio.Consultar();
                var listaRol = queryRol.ToList();

                return _mapper.Map<List<EstadosReporteDTO>>(listaRol);
            }
            catch
            {
                throw;
            }
        }
    }
}
