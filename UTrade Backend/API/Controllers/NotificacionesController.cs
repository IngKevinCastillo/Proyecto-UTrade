using API.Utilidad;
using BLL.Servicios.Contrato;
using DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificacionesController : ControllerBase
    {
        private readonly INotificacionServicio _notificacionesServicio;
        public NotificacionesController(INotificacionServicio notificacionesServicio)
        {
            _notificacionesServicio = notificacionesServicio;
        }

        [HttpGet]
        [Route("ListarPorIdUsuario/{idUsuario}")]
        public async Task<IActionResult> ListarPorIdUsuario(string idUsuario)
        {
            var rsp = new Respuesta<List<NotificacionesDTO>>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _notificacionesServicio.ListarPorIdUsuario(idUsuario);
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
        public async Task<IActionResult> Guardar([FromBody] NotificacionesDTO notificacion)
        {
            var rsp = new Respuesta<NotificacionesDTO>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _notificacionesServicio.Crear(notificacion);
            }
            catch (Exception ex)
            {
                rsp.estado = false;
                rsp.mgs = ex.Message;
            }
            return Ok(rsp);
        }

        [HttpPut]
        [Route("CambiarEstado")]
        public async Task<IActionResult> CambiarEstado([FromBody] NotificacionesDTO notificacion, bool estado)
        {
            var rsp = new Respuesta<bool>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _notificacionesServicio.CambiarEstado(estado, notificacion);
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
