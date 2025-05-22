using AutoMapper;
using BLL.Servicios.Contrato;
using DAL.Repositorios.Contrato;
using DTO;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Servicios
{
    public class TipoAccionServicio : ITipoAccionServicio
    {
        private readonly IRepositorioGenerico<TipoAccion> _tipoAccionRepositorio;
        private readonly IMapper _mapper;
        public TipoAccionServicio(IRepositorioGenerico<TipoAccion> tipoAccionRepositorio, IMapper mapper)
        {
            _tipoAccionRepositorio = tipoAccionRepositorio;
            _mapper = mapper;
        }

        public async Task<TipoAccionDTO> Buscar(string id)
        {
            try
            {
                var queryTipoAccion = await _tipoAccionRepositorio.Obtener(x => x.Id == id);

                return _mapper.Map<TipoAccionDTO>(queryTipoAccion);
            }
            catch
            {
                throw;
            }
        }

        public async Task<TipoAccionDTO> Crear(TipoAccionDTO modelo)
        {
            try
            {
                var tipoAccionCreada = await _tipoAccionRepositorio.Crear(_mapper.Map<TipoAccion>(modelo));
                if (tipoAccionCreada.Id == null)
                    throw new Exception("No se pudo crear");
                return _mapper.Map<TipoAccionDTO>(tipoAccionCreada);
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(TipoAccionDTO modelo)
        {
            try
            {
                var tipoAccionModelo = _mapper.Map<TipoAccion>(modelo);
                var notificacionEncontrada = await _tipoAccionRepositorio.Obtener(x => x.Id == modelo.Id);
                if (notificacionEncontrada == null)
                    throw new TaskCanceledException("El tipo accion no existe");
                notificacionEncontrada.IdPersonaRemitente = tipoAccionModelo.IdPersonaRemitente;
                notificacionEncontrada.IdPersonaReportada = tipoAccionModelo.IdPersonaReportada;
                notificacionEncontrada.IdTipoMensaje = tipoAccionModelo.IdTipoMensaje;
                bool respuesta = await _tipoAccionRepositorio.Editar(notificacionEncontrada);
                if (!respuesta)
                    throw new TaskCanceledException("No se pudo editar");
                return respuesta;
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
                var tipoAccionEncontrada = await _tipoAccionRepositorio.Obtener(x => x.Id == id);
                if (tipoAccionEncontrada == null)
                    throw new TaskCanceledException("El tipo accion no existe");
                bool respuesta = await _tipoAccionRepositorio.Eliminar(tipoAccionEncontrada);
                if (!respuesta)
                    throw new TaskCanceledException("No se pudo eliminar");
                return respuesta;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<TipoAccionDTO>> Listar()
        {
            try
            {
                var queryTipoAccion = await _tipoAccionRepositorio.Consultar();
                var listaTipoAccion = queryTipoAccion.ToList();

                return _mapper.Map<List<TipoAccionDTO>>(listaTipoAccion);
            }
            catch
            {
                throw;
            }
        }
    }
}
