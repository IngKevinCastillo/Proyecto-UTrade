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
    public class NotificacionServicio : INotificacionServicio
    {
        private readonly IRepositorioGenerico<Notificaciones> _notificacionesRepositorio;
        private readonly IMapper _mapper;
        public NotificacionServicio(IRepositorioGenerico<Notificaciones> notificacionesRepositorio, IMapper mapper)
        {
            _notificacionesRepositorio = notificacionesRepositorio;
            _mapper = mapper;
        }

        public async Task<NotificacionesDTO> Buscar(string id)
        {
            try
            {
                var queryNotificaciones = await _notificacionesRepositorio.Obtener(x => x.Id == id);

                return _mapper.Map<NotificacionesDTO>(queryNotificaciones);
            }
            catch
            {
                throw;
            }
        }

        public async Task<NotificacionesDTO> Crear(NotificacionesDTO modelo)
        {
            try
            {
                var notificacionCreada = await _notificacionesRepositorio.Crear(_mapper.Map<Notificaciones>(modelo));
                if (notificacionCreada.Id == null)
                    throw new Exception("No se pudo crear");
                return _mapper.Map<NotificacionesDTO>(notificacionCreada);
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(NotificacionesDTO modelo)
        {
            try
            {
                var notificacionModelo = _mapper.Map<Notificaciones>(modelo);
                var notificacionEncontrada = await _notificacionesRepositorio.Obtener(x => x.Id == modelo.Id);
                if (notificacionEncontrada == null)
                    throw new TaskCanceledException("La notificacion no existe");
                notificacionEncontrada.IdTipoAccion = notificacionModelo.IdTipoAccion;
                notificacionEncontrada.IdTipoAccionNavigation = notificacionModelo.IdTipoAccionNavigation;
                notificacionEncontrada.Fecha = notificacionModelo.Fecha;
                notificacionEncontrada.Hora = notificacionModelo.Hora;
                bool respuesta = await _notificacionesRepositorio.Editar(notificacionEncontrada);
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
                var notificacionEncontrada = await _notificacionesRepositorio.Obtener(x => x.Id == id);
                if (notificacionEncontrada == null)
                    throw new TaskCanceledException("El rol no existe");
                bool respuesta = await _notificacionesRepositorio.Eliminar(notificacionEncontrada);
                if (!respuesta)
                    throw new TaskCanceledException("No se pudo eliminar");
                return respuesta;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<NotificacionesDTO>> Listar()
        {
            try
            {
                var queryNotificaciones = await _notificacionesRepositorio.Consultar();
                var listaNotificaciones = queryNotificaciones.ToList();

                return _mapper.Map<List<NotificacionesDTO>>(listaNotificaciones);
            }
            catch
            {
                throw;
            }
        }
    }
}
