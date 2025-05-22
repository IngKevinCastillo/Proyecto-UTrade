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
    public class MotivoReporteServicio : IMotivoReporteServicio
    {
        private readonly IRepositorioGenerico<MotivosReporte> _MotivoReporteRepositorio;
        private readonly IMapper _mapper;
        public MotivoReporteServicio(IRepositorioGenerico<MotivosReporte> motivoReporteRepositorio, IMapper mapper)
        {
            _MotivoReporteRepositorio = motivoReporteRepositorio;
            _mapper = mapper;
        }

        public async Task<MotivosReporteDTO> Crear(MotivosReporteDTO modelo)
        {
            try
            {
                var motivoReporteCreado = await _MotivoReporteRepositorio.Crear(_mapper.Map<MotivosReporte>(modelo));
                if (motivoReporteCreado.Id == null)
                    throw new Exception("No se pudo crear");
                return _mapper.Map<MotivosReporteDTO>(motivoReporteCreado);
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(MotivosReporteDTO modelo)
        {
            try
            {
                var motivoReporteModelo = _mapper.Map<MotivosReporte>(modelo);
                var motivoReporteEncontrado = await _MotivoReporteRepositorio.Obtener(x => x.Id == modelo.Id);
                if (motivoReporteEncontrado == null)
                    throw new TaskCanceledException("El motivo no existe");
                motivoReporteEncontrado.Nombre = motivoReporteModelo.Nombre;
                bool respuesta = await _MotivoReporteRepositorio.Editar(motivoReporteEncontrado);
                if (!respuesta)
                    throw new TaskCanceledException("No se pudo editar");
                return respuesta;
            }
            catch
            {
                throw;
            }
        }

        public async Task<MotivosReporteDTO> Buscar(string id)
        {

            try
            {
                var queryRol = await _MotivoReporteRepositorio.Obtener(x => x.Id == id);

                return _mapper.Map<MotivosReporteDTO>(queryRol);
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
                var motivoReporteEncontrado = await _MotivoReporteRepositorio.Obtener(x => x.Id == id);
                if (motivoReporteEncontrado == null)
                    throw new TaskCanceledException("El motivo de reporte no existe");
                bool respuesta = await _MotivoReporteRepositorio.Eliminar(motivoReporteEncontrado);
                if (!respuesta)
                    throw new TaskCanceledException("No se pudo eliminar");
                return respuesta;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<MotivosReporteDTO>> Listar()
        {
            try
            {
                var queryRol = await _MotivoReporteRepositorio.Consultar();
                var listaRol = queryRol.ToList();

                return _mapper.Map<List<MotivosReporteDTO>>(listaRol);
            }
            catch
            {
                throw;
            }
        }
    }
}
