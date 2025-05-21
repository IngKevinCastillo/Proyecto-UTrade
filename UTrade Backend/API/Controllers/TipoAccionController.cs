using API.Utilidad;
using BLL.Servicios.Contrato;
using DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoAccionController : ControllerBase
    {
        private readonly ITipoAccionServicio _tipoAccionServicio;
        public TipoAccionController(ITipoAccionServicio tipoAccionServicio)
        {
            _tipoAccionServicio = tipoAccionServicio;
        }

        [HttpGet]
        [Route("Listar")]
        public async Task<IActionResult> listar()
        {
            var rsp = new Respuesta<List<TipoAccionDTO>>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _tipoAccionServicio.Listar();
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
            var rsp = new Respuesta<TipoAccionDTO>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _tipoAccionServicio.Buscar(id);
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
        public async Task<IActionResult> Guardar([FromBody] TipoAccionDTO tipoAccion)
        {
            var rsp = new Respuesta<TipoAccionDTO>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _tipoAccionServicio.Crear(tipoAccion);
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
        public async Task<IActionResult> Editar([FromBody] TipoAccionDTO tipoAccion)
        {
            var rsp = new Respuesta<bool>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _tipoAccionServicio.Editar(tipoAccion);
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
                rsp.Valor = await _tipoAccionServicio.Eliminar(id);
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