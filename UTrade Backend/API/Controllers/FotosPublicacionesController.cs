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
    public class FotosPublicacionesController : ControllerBase
    {
        private readonly IFotosPublicacionesServicio _fotosPublicacionesServicio;
        public FotosPublicacionesController(IFotosPublicacionesServicio fotosPublicacionesServicio)
        {
            _fotosPublicacionesServicio = fotosPublicacionesServicio;
        }

        [HttpGet]
        [Route("Listar")]
        public async Task<IActionResult> listar()
        {
            var rsp = new Respuesta<List<FotosPublicacionesDTO>>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _fotosPublicacionesServicio.Listar();
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
            var rsp = new Respuesta<FotosPublicacionesDTO>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _fotosPublicacionesServicio.Buscar(id);
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
        public async Task<IActionResult> Guardar([FromBody] FotosPublicacionesDTO fotosPublicaciones)
        {
            var rsp = new Respuesta<FotosPublicacionesDTO>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _fotosPublicacionesServicio.Crear(fotosPublicaciones);
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
        public async Task<IActionResult> Editar([FromBody] FotosPublicacionesDTO fotosPublicaciones)
        {
            var rsp = new Respuesta<bool>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _fotosPublicacionesServicio.Editar(fotosPublicaciones);
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
                rsp.Valor = await _fotosPublicacionesServicio.Eliminar(id);
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
