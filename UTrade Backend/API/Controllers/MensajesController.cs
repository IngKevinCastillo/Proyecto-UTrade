using API.Hubs;  // ← asegura que tengas el namespace correcto
using API.Utilidad;
using BLL.Servicios.Contrato;
using DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MensajesController : ControllerBase
    {
        private readonly IMensajesServicio _mensajesServicio;
        private readonly IHubContext<MensajesHub> _hubContext;

        public MensajesController(IMensajesServicio mensajesServicio, IHubContext<MensajesHub> hubContext)
        {
            _mensajesServicio = mensajesServicio;
            _hubContext = hubContext;
        }

        [HttpGet]
        [Route("Buscar/{id}")]
        public async Task<IActionResult> Buscar(string id)
        {
            var rsp = new Respuesta<MensajesDTO>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _mensajesServicio.Buscar(id);
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
        public async Task<IActionResult> Guardar([FromBody] CrearMensajeDTO mensajesDTO)
        {
            var rsp = new Respuesta<MensajesDTO>();
            try
            {
                var mensajeCreado = await _mensajesServicio.Crear(mensajesDTO);

                await _hubContext.Clients.Group(mensajeCreado.ChatId).SendAsync("RecibirMensaje", mensajeCreado);

                rsp.estado = true;
                rsp.Valor = mensajeCreado;
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
                rsp.Valor = await _mensajesServicio.Eliminar(id);
            }
            catch (Exception ex)
            {
                rsp.estado = false;
                rsp.mgs = ex.Message;
            }
            return Ok(rsp);
        }

        [HttpGet]
        [Route("Listar/")]
        public async Task<IActionResult> Listar()
        {
            var rsp = new Respuesta<List<MensajesDTO>>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _mensajesServicio.Listar();
            }
            catch (Exception ex)
            {
                rsp.estado = false;
                rsp.mgs = ex.Message;
            }
            return Ok(rsp);
        }

        [HttpGet]
        [Route("ListarPorChat/{idChat}")]
        public async Task<IActionResult> ListarPorChat(string idChat)
        {
            var rsp = new Respuesta<List<MensajesDTO>>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _mensajesServicio.ListarPorIdChat(idChat);
            }
            catch (Exception ex)
            {
                rsp.estado = false;
                rsp.mgs = ex.Message;
            }
            return Ok(rsp);
        }

        [HttpGet]
        [Route("ObtenerMensajeMasReciente/{idChat}")]
        public async Task<IActionResult> ObtenerMensajeMasReciente(string idChat)
        {
            var rsp = new Respuesta<MensajesDTO>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _mensajesServicio.ObtenerMensajeMasReciente(idChat);
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
