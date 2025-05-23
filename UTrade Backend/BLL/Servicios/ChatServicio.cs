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

        public async Task<ChatDTO> Crear(ChatDTO modelo)
        {
            try
            {
                var chatCreado = await _chatRepositorio.Crear(_mapper.Map<Chat>(modelo));
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
    }
}
