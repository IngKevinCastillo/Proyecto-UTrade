using API.Utilidad;
using BLL.Servicios.Contrato;
using DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReseniaController : ControllerBase
    {
        private readonly IReseniaServicio _reseniaServicio;
        public ReseniaController(IReseniaServicio reseniaServicio)
        {
            _reseniaServicio = reseniaServicio;
        }

        [HttpGet]
        [Route("Listar")]
        public async Task<IActionResult> Listar()
        {
            var rsp = new Respuesta<List<ReseñaDTO>>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _reseniaServicio.Listar();
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
            var rsp = new Respuesta<ReseñaDTO>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _reseniaServicio.Buscar(id);
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
        public async Task<IActionResult> Guardar([FromBody] ReseñaDTO resenia)
        {
            var rsp = new Respuesta<ReseñaDTO>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _reseniaServicio.Crear(resenia);
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
        public async Task<IActionResult> Editar([FromBody] ReseñaDTO resenia)
        {
            var rsp = new Respuesta<bool>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _reseniaServicio.Editar(resenia);
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
                rsp.Valor = await _reseniaServicio.Eliminar(id);
            }
            catch (Exception ex)
            {
                rsp.estado = false;
                rsp.mgs = ex.Message;
            }
            return Ok(rsp);
        }

        [HttpGet]
        [Route("ListarPorPublicacion/{idPublicacion}")]
        public async Task<IActionResult> ListarPorPublicacion(string idPublicacion)
        {
            var rsp = new Respuesta<List<ReseñaDTO>>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _reseniaServicio.ListarPorPublicacion(idPublicacion);
            }
            catch (Exception ex)
            {
                rsp.estado = false;
                rsp.mgs = ex.Message;
            }
            return Ok(rsp);
        }

        [HttpGet]
        [Route("ListarPorPersona/{idPersona}")]
        public async Task<IActionResult> ListarPorPersona(string idPersona)
        {
            var rsp = new Respuesta<List<ReseñaDTO>>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _reseniaServicio.ListarPorPersona(idPersona);
            }
            catch (Exception ex)
            {
                rsp.estado = false;
                rsp.mgs = ex.Message;
            }
            return Ok(rsp);
        }

        [HttpGet]
        [Route("ListarPorCalificacion/{calificacion}")]
        public async Task<IActionResult> ListarPorCalificacion(int calificacion)
        {
            var rsp = new Respuesta<List<ReseñaDTO>>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _reseniaServicio.ListarPorCalificacion(calificacion);
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
