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

        public async Task<MensajesDTO> Crear(CrearMensajeDTO modelo)
        {
            var mensaje = _mapper.Map<Mensajes>(modelo);
            mensaje.Hora = DateTime.Now;
            mensaje.Id = await GenerarId();
            var mensajeCreado = await _mensajesRepositorio.Crear(mensaje);
            if (mensajeCreado == null)
                throw new TaskCanceledException("No se pudo crear el Mensaje");
            return _mapper.Map<MensajesDTO>(mensajeCreado);
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

        public async Task<string> GenerarId()
        {
            var mensajes = await _mensajesRepositorio.Consultar();

            var numerosExistentes = mensajes
                .Where(m => m.Id != null && m.Id.StartsWith("MSJ"))
                .AsEnumerable()
                .Select(m => {
                    var parteNumero = m.Id.Substring(3);
                    if (int.TryParse(parteNumero, out int numero))
                        return numero;
                    return 0;
                });

            int maxNumero = numerosExistentes.Any() ? numerosExistentes.Max() : 0;
            int nuevoNumero = maxNumero + 1;
            string nuevoId = $"MSJ{nuevoNumero.ToString("D6")}";

            return nuevoId;
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

        public async Task<MensajesDTO> ObtenerMensajeMasReciente(string idChat)
        {
            try
            {
                var mensajes = await _mensajesRepositorio.Consultar(x => x.ChatId == idChat);
                if (mensajes == null || !mensajes.Any())
                    throw new TaskCanceledException("No se encontraron mensajes para el chat especificado");
                var mensajeMasReciente = mensajes.OrderByDescending(x => x.Hora).FirstOrDefault();
                return _mapper.Map<MensajesDTO>(mensajeMasReciente);
            }
            catch
            {
                throw;
            }
        }

    }
}
