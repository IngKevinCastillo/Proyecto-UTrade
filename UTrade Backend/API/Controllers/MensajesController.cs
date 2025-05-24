using API.Utilidad;
using BLL.Servicios.Contrato;
using DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MensajesController : ControllerBase
    {
        private readonly IMensajesServicio _mensajesServicio; 
        public MensajesController(IMensajesServicio mensajesServicio)
        {
            _mensajesServicio = mensajesServicio;
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
        public async Task<IActionResult> Guardar([FromBody] MensajesDTO mensajes)
        {
            var rsp = new Respuesta<MensajesDTO>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _mensajesServicio.Crear(mensajes);
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
    }
}
