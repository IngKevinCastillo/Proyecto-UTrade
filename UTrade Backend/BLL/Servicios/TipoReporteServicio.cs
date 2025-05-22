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
    public class TipoReporteServicio : ITipoReporteServicio
    {
        private readonly IRepositorioGenerico<TiposReporte> _tipoReporteRepositorio;
        private readonly IMapper _mapper;
        public TipoReporteServicio(IRepositorioGenerico<TiposReporte> tipoReporteRepositorio, IMapper mapper)
        {
            _tipoReporteRepositorio = tipoReporteRepositorio;
            _mapper = mapper;
        }

        public async Task<TiposReporteDTO> Crear(TiposReporteDTO modelo)
        {
            try
            {
                var TipoReporteCreado = await _tipoReporteRepositorio.Crear(_mapper.Map<TiposReporte>(modelo));
                if (TipoReporteCreado.Id == null)
                    throw new Exception("No se pudo crear");
                return _mapper.Map<TiposReporteDTO>(TipoReporteCreado);
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(TiposReporteDTO modelo)
        {
            try
            {
                var tipoReporteModelo = _mapper.Map<TiposReporte>(modelo);
                var tipoReporteEncontrado = await _tipoReporteRepositorio.Obtener(x => x.Id == modelo.Id);
                if (tipoReporteEncontrado == null)
                    throw new TaskCanceledException("El rol no existe");
                tipoReporteEncontrado.Nombre = tipoReporteModelo.Nombre;
                bool respuesta = await _tipoReporteRepositorio.Editar(tipoReporteEncontrado);
                if (!respuesta)
                    throw new TaskCanceledException("No se pudo editar");
                return respuesta;
            }
            catch
            {
                throw;
            }
        }

        public async Task<TiposReporteDTO> Buscar(string id)
        {

            try
            {
                var queryRol = await _tipoReporteRepositorio.Obtener(x => x.Id == id);

                return _mapper.Map<TiposReporteDTO>(queryRol);
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
                var tipoReporteEncontrado = await _tipoReporteRepositorio.Obtener(x => x.Id == id);
                if (tipoReporteEncontrado == null)
                    throw new TaskCanceledException("El tipo de reporte no existe");
                bool respuesta = await _tipoReporteRepositorio.Eliminar(tipoReporteEncontrado);
                if (!respuesta)
                    throw new TaskCanceledException("No se pudo eliminar");
                return respuesta;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<TiposReporteDTO>> Listar()
        {
            try
            {
                var queryRol = await _tipoReporteRepositorio.Consultar();
                var listaRol = queryRol.ToList();

                return _mapper.Map<List<TiposReporteDTO>>(listaRol);
            }
            catch
            {
                throw;
            }
        }
    }
}
