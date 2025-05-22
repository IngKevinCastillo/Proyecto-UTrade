using API.Utilidad;
using BLL.Servicios;
using BLL.Servicios.Contrato;
using DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CodigosVerificacionController : ControllerBase
    {
        private readonly ICodigosVerificacionServicio _codigosVerificacionServicio;
        public CodigosVerificacionController(ICodigosVerificacionServicio codigosVerificacionServicio)
        {
            _codigosVerificacionServicio = codigosVerificacionServicio;
        }

        [HttpGet]
        [Route("Listar")]
        public async Task<IActionResult> listar()
        {
            var rsp = new Respuesta<List<CodigosVerificacionDTO>>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _codigosVerificacionServicio.Listar();
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
            var rsp = new Respuesta<CodigosVerificacionDTO>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _codigosVerificacionServicio.Buscar(id);
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
        public async Task<IActionResult> Guardar([FromBody] CodigosVerificacionDTO codigosVerificacion)
        {
            var rsp = new Respuesta<CodigosVerificacionDTO>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _codigosVerificacionServicio.Crear(codigosVerificacion);
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
