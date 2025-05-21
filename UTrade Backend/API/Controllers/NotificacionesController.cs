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
        [Route("Listar")]
        public async Task<IActionResult> listar()
        {
            var rsp = new Respuesta<List<NotificacionesDTO>>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _notificacionesServicio.Listar();
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
            var rsp = new Respuesta<NotificacionesDTO>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _notificacionesServicio.Buscar(id);
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
        [Route("Editar")]
        public async Task<IActionResult> Editar([FromBody] NotificacionesDTO notificacion)
        {
            var rsp = new Respuesta<bool>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _notificacionesServicio.Editar(notificacion);
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
                rsp.Valor = await _notificacionesServicio.Eliminar(id);
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
