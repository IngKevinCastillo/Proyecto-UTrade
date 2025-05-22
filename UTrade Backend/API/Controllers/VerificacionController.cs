using API.Utilidad;
using BLL.Servicios.Contrato;
using DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VerificacionController : ControllerBase
    {

        private readonly IRegistroServicio _registroServicio;
        public VerificacionController(IRegistroServicio registroServicio)
        {
            _registroServicio = registroServicio;
        }

        [HttpGet]
        [Route("EnviarCorreoVerificacion")]
        public async Task<IActionResult> EnviarCorreoVerificacion([FromBody] EnviarCorreoVerificacionDTO datos)
        {
            var rsp = new Respuesta<bool>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _registroServicio.EnviarCorreoVerificacion(datos);
            }
            catch (Exception ex)
            {
                rsp.estado = false;
                rsp.mgs = ex.Message;
            }
            return Ok(rsp);
        }

        [HttpGet]
        [Route("GenerarCodigoRegistro")]
        public async Task<IActionResult> GenerarCodigoRegistro([FromBody] DateTime fechaNacimiento)
        {
            var rsp = new Respuesta<string>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _registroServicio.GenerarCodigoRegistro(fechaNacimiento);
            }
            catch (Exception ex)
            {
                rsp.estado = false;
                rsp.mgs = ex.Message;
            }
            return Ok(rsp);
        }

        [HttpGet]
        [Route("ValidarCodigoRegistro")]
        public async Task<IActionResult> ValidarCodigoRegistro([FromBody] CodigoVerificacionDTO dto)
        {
            var rsp = new Respuesta<bool>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _registroServicio.ValidarCodigoRegistro(dto.CodigoRegistro, dto.CodigoRecibido);
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
