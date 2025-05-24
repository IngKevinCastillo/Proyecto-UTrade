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
    public class MensajesServicio : IMensajesServicio
    {
        private readonly IRepositorioGenerico<Mensajes> _mensajesRepositorio;
        private readonly IMapper _mapper;

        public MensajesServicio(IRepositorioGenerico<Mensajes> mensajesRepositorio, IMapper mapper)
        {
            _mensajesRepositorio = mensajesRepositorio;
            _mapper = mapper;
        }

        public async Task<MensajesDTO> Buscar(string id)
        {
            try
            {
                var mensajeEncontrado = await _mensajesRepositorio.Obtener(x => x.Id == id);
                if (mensajeEncontrado == null)
                    throw new TaskCanceledException("El Mensaje no existe");
                return _mapper.Map<MensajesDTO>(mensajeEncontrado);
            }
            catch
            {
                throw;
            }
        }

        public async Task<MensajesDTO> Crear(MensajesDTO modelo)
        {
            try
            {
                var mensajeCreado = await _mensajesRepositorio.Crear(_mapper.Map<Mensajes>(modelo));
                if (mensajeCreado.Id == null)
                    throw new Exception("No se pudo crear");
                return _mapper.Map<MensajesDTO>(mensajeCreado);
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
                var mensajeEncontrado = await _mensajesRepositorio.Obtener(x => x.Id == id);
                if (mensajeEncontrado == null)
                    throw new TaskCanceledException("El Mensaje no existe");
                bool respuesta = await _mensajesRepositorio.Eliminar(mensajeEncontrado);
                if (!respuesta)
                    throw new TaskCanceledException("No se pudo eliminar");
                return respuesta;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<MensajesDTO>> Listar()
        {
            try
            {
                var mensajes = await _mensajesRepositorio.Consultar();
                if (mensajes == null)
                    throw new TaskCanceledException("No se encontraron mensajes");
                return _mapper.Map<List<MensajesDTO>>(mensajes);
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<MensajesDTO>> ListarPorIdChat(string idChat)
        {
            try
            {
                var mensajes = await _mensajesRepositorio.Consultar(x => x.ChatId == idChat);
                if (mensajes == null || !mensajes.Any())
                    throw new TaskCanceledException("No se encontraron mensajes para el chat especificado");
                return _mapper.Map<List<MensajesDTO>>(mensajes);
            }
            catch
            {
                throw;
            }
        }
    }
}
