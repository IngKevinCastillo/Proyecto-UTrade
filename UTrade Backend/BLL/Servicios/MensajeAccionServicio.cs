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
    public class MensajeAccionServicio : IMensajeAccionServicio
    {
        private readonly IRepositorioGenerico<MensajeAccion> _mensajeAccionRepositorio;
        private readonly IMapper _mapper;
        public MensajeAccionServicio(IRepositorioGenerico<MensajeAccion> mensajeAccionRepositorio, IMapper mapper)
        {
            _mensajeAccionRepositorio = mensajeAccionRepositorio;
            _mapper = mapper;
        }

        public async Task<MensajeAccionDTO> Buscar(string id)
        {
            try
            {
                var queryMensajeAccion = await _mensajeAccionRepositorio.Obtener(x => x.Id == id);

                return _mapper.Map<MensajeAccionDTO>(queryMensajeAccion);
            }
            catch
            {
                throw;
            }
        }

        public async Task<MensajeAccionDTO> Crear(MensajeAccionDTO modelo)
        {
            try
            {
                var mensajeAccionCreada = await _mensajeAccionRepositorio.Crear(_mapper.Map<MensajeAccion>(modelo));
                if (mensajeAccionCreada.Id == null)
                    throw new Exception("No se pudo crear");
                return _mapper.Map<MensajeAccionDTO>(mensajeAccionCreada);
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(MensajeAccionDTO modelo)
        {
            try
            {
                var mensajeAccionModelo = _mapper.Map<MensajeAccion>(modelo);
                var mensajeAccionEncontrado = await _mensajeAccionRepositorio.Obtener(x => x.Id == modelo.Id);
                if (mensajeAccionEncontrado == null)
                    throw new TaskCanceledException("El mensaje accion no existe");
                mensajeAccionEncontrado.Descripcion = mensajeAccionModelo.Descripcion;
                bool respuesta = await _mensajeAccionRepositorio.Editar(mensajeAccionEncontrado);
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
                var mensajeAccionEncontrado = await _mensajeAccionRepositorio.Obtener(x => x.Id == id);
                if (mensajeAccionEncontrado == null)
                    throw new TaskCanceledException("El mensaje accion no existe");
                bool respuesta = await _mensajeAccionRepositorio.Eliminar(mensajeAccionEncontrado);
                if (!respuesta)
                    throw new TaskCanceledException("No se pudo eliminar");
                return respuesta;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<MensajeAccionDTO>> Listar()
        {
            try
            {
                var queryMensajeAccion = await _mensajeAccionRepositorio.Consultar();
                var listaMensajeAccion = queryMensajeAccion.ToList();

                return _mapper.Map<List<MensajeAccionDTO>>(listaMensajeAccion);
            }
            catch
            {
                throw;
            }
        }
    }
}
