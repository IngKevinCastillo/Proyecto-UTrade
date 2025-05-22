using API.Utilidad;
using BLL.Servicios.Contrato;
using DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactanosController : ControllerBase
    {
        private readonly IContactanosServicio _contactanosServicio;
        public ContactanosController(IContactanosServicio contactanosServicio)
        {
            _contactanosServicio = contactanosServicio;
        }

        [HttpGet]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] ContactanosDTO contacto)
        {
            var rsp = new Respuesta<ContactanosDTO>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _contactanosServicio.Crear(contacto);
            }
            catch (Exception ex)
            {
                rsp.estado = false;
                rsp.mgs = ex.Message;
            }
            return Ok(rsp);
        }

        [HttpPost]
        [Route("Enviar")]
        public async Task<IActionResult> EnviarCorreo([FromBody] EnviarCorreoSoporteDTO datos)
        {
            try
            {
                bool resultado = await _contactanosServicio.EnviarCorreo(
                    datos.CorreoDestino,
                    datos.Asunto,
                    datos.Mensaje,
                    datos.Razon,
                    datos.CorreoRespuesta
                );

                return Ok(new
                {
                    estado = resultado,
                    mensaje = "Correo enviado correctamente"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    estado = false,
                    mensaje = ex.Message
                });
            }
        }

    }
}
