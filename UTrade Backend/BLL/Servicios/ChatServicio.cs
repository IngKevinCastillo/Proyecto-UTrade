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
    public class ChatServicio : IChatServicio
    {
        private readonly IRepositorioGenerico<Chat> _chatRepositorio;
        private readonly IMapper _mapper;

        public ChatServicio(IRepositorioGenerico<Chat> chatRepositorio, IMapper mapper)
        {
            _chatRepositorio = chatRepositorio;
            _mapper = mapper;
        }

        public async Task<ChatDTO> Buscar(string id)
        {
            try
            {
                var queryChat = await _chatRepositorio.Obtener(x => x.Id == id);
                if (queryChat == null)
                    throw new TaskCanceledException("El chat no existe");
                return _mapper.Map<ChatDTO>(queryChat);
            }
            catch
            {
                throw;
            }
        }

        public async Task<ChatDTO> Crear(CrearChatDTO modelo)
        {
            try
            {
                var chat = _mapper.Map<Chat>(modelo);
                chat.Id = await GenerarId();
                chat.FechaCreacion = DateTime.Now;

                var chatCreado = await _chatRepositorio.Crear(chat);

                if (chatCreado.Id == null)
                    throw new Exception("No se pudo crear");

                return _mapper.Map<ChatDTO>(chatCreado);
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
                var chatEncontrado = await _chatRepositorio.Obtener(x => x.Id == id);
                if (chatEncontrado == null)
                    throw new TaskCanceledException("El chat no existe");
                bool respuesta = await _chatRepositorio.Eliminar(chatEncontrado);
                if (!respuesta)
                    throw new TaskCanceledException("No se pudo eliminar");
                return respuesta;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<ChatDTO>> Listar()
        {
            try
            {
                var queryChat = await _chatRepositorio.Consultar();
                if (queryChat == null)
                    throw new TaskCanceledException("No hay chats");
                return _mapper.Map<List<ChatDTO>>(queryChat.ToList());
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<ChatDTO>> ListarPorIdPersona(string idUsuario)
        {
            try
            {
                var queryChat = await _chatRepositorio.Consultar(x => x.Usuario1Id == idUsuario || x.Usuario2Id == idUsuario);
                if (queryChat == null)
                    throw new TaskCanceledException("No hay chats");
                return _mapper.Map<List<ChatDTO>>(queryChat.ToList());
            }
            catch
            {
                throw;
            }
        }

        public async Task<string> GenerarId()
        {
            var chats = await _chatRepositorio.Consultar();

            var numerosExistentes = chats
                .Where(c => c.Id != null && c.Id.StartsWith("CH"))
                .AsEnumerable()
                .Select(c =>
                {
                    var parteNumero = c.Id.Substring(2);
                    return int.TryParse(parteNumero, out int numero) ? numero : 0;
                });

            int maxNumero = numerosExistentes.Any() ? numerosExistentes.Max() : 0;

            int nuevoNumero = maxNumero + 1;

            string nuevoId = $"CH{nuevoNumero.ToString("D5")}";

            return nuevoId;
        }

        public async Task<string?> VerificarExistenciaChat(string idUsuario1, string idUsuario2)
        {
            try
            {
                if (idUsuario1 == idUsuario2)
                    return null;
                var chats = await _chatRepositorio.Consultar(x =>
                    (x.Usuario1Id == idUsuario1 && x.Usuario2Id == idUsuario2) ||
                    (x.Usuario1Id == idUsuario2 && x.Usuario2Id == idUsuario1));

                var chatExistente = chats.FirstOrDefault();

                return chatExistente?.Id;
            }
            catch
            {
                throw;
            }
        }


    }
}
