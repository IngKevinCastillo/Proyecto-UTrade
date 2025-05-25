using API.Utilidad;
using BLL.Servicios.Contrato;
using DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IChatServicio _chatServicio;
        public ChatController(IChatServicio chatServicio)
        {
            _chatServicio = chatServicio;
        }
        [HttpGet]
        [Route("Listar")]
        public async Task<IActionResult> listar()
        {
            var rsp = new Respuesta<List<ChatDTO>>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _chatServicio.Listar();
            }
            catch (Exception ex)
            {
                rsp.estado = false;
                rsp.mgs = ex.Message;
            }
            return Ok(rsp);
        }
        [HttpGet]
        [Route("Buscar/{id}")]
        public async Task<IActionResult> Buscar(string id)
        {
            var rsp = new Respuesta<ChatDTO>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _chatServicio.Buscar(id);
            }
            catch (Exception ex)
            {
                rsp.estado = false;
                rsp.mgs = ex.Message;
            }
            return Ok(rsp);
        }
        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] CrearChatDTO chat)
        {
            var rsp = new Respuesta<ChatDTO>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _chatServicio.Crear(chat);
            }
            catch (Exception ex)
            {
                rsp.estado = false;
                rsp.mgs = ex.Message;
            }
            return Ok(rsp);
        }
        [HttpDelete]
        [Route("Eliminar/{id}")]
        public async Task<IActionResult> Eliminar(string id)
        {
            var rsp = new Respuesta<bool>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _chatServicio.Eliminar(id);
            }
            catch (Exception ex)
            {
                rsp.estado = false;
                rsp.mgs = ex.Message;
            }
            return Ok(rsp);
        }

        [HttpGet]
        [Route("ListarPorIdPersona/{idUsuario}")]
        public async Task<IActionResult> ListarPorIdPersona(string idUsuario)
        {
            var rsp = new Respuesta<List<ChatDTO>>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _chatServicio.ListarPorIdPersona(idUsuario);
            }
            catch (Exception ex)
            {
                rsp.estado = false;
                rsp.mgs = ex.Message;
            }
            return Ok(rsp);
        }

        [HttpGet]
        [Route("VerificarExistenciaChat/{idUsuario1}/{idUsuario2}")]
        public async Task<IActionResult> VerificarExistenciaChat(string idUsuario1, string idUsuario2)
        {
            var rsp = new Respuesta<string>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _chatServicio.VerificarExistenciaChat(idUsuario1, idUsuario2) ?? string.Empty;
            }
            catch (Exception ex)
            {
                rsp.estado = false;
                rsp.mgs = ex.Message;
            }
            return Ok(rsp);
        }
    }
}
