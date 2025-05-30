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

        public async Task<bool> CambiarEstado(bool estado, NotificacionesDTO notificacion)
        {
            try
            {
                var notifiacionModelo = _mapper.Map<NotificacionesDTO>(notificacion);
                var notificacionEncontrado = await _notificacionesRepositorio.Obtener(x => x.Id == notificacion.Id);
                if (notificacionEncontrado == null)
                    throw new TaskCanceledException("La notificacion no existe");
                notificacionEncontrado.Estado = notifiacionModelo.Estado;
                bool respuesta = await _notificacionesRepositorio.Editar(notificacionEncontrado);
                if (!respuesta)
                    throw new TaskCanceledException("No se pudo editar");
                return respuesta;
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
        public async Task<List<NotificacionesDTO>> ListarPorIdUsuario(string idUsuario)
        {
            try
            {
                var listaNotificaciones = await _notificacionesRepositorio.Consultar();
                if (listaNotificaciones == null || !listaNotificaciones.Any())
                    throw new Exception("No hay notificaciones.");
                var notificacionesFiltradas = listaNotificaciones.Where(x => x.IdPersona == idUsuario).ToList();
                if (notificacionesFiltradas == null || !notificacionesFiltradas.Any())
                    throw new Exception("No hay notificaciones para el usuario especificado.");
                return _mapper.Map<List<NotificacionesDTO>>(notificacionesFiltradas);
            }
            catch
            {
                throw;
            }
        }
    }
}
