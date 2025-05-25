using API.Utilidad;
using BLL.Servicios.Contrato;
using DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PublicacionesController : ControllerBase
    {
        private readonly IPublicacionesServicio _publicacionesServicio;
        public PublicacionesController(IPublicacionesServicio publicacionesServicio)
        {
            _publicacionesServicio = publicacionesServicio;
        }
        [HttpGet]
        [Route("Listar")]
        public async Task<IActionResult> listar()
        {
            var rsp = new Respuesta<List<PublicacionesDTO>>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _publicacionesServicio.Listar();
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
            var rsp = new Respuesta<PublicacionesDTO>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _publicacionesServicio.Buscar(id);
            }
            catch (Exception ex)
            {
                rsp.estado = false;
                rsp.mgs = ex.Message;
            }
            return Ok(rsp);
        }

        [HttpGet]
        [Route("ListarPorCategoria/{id}")]
        public async Task<IActionResult> ListarPorCategoria(string id)
        {
            var rsp = new Respuesta<List<PublicacionesDTO>>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _publicacionesServicio.ListarPorCategoria(id);
            }
            catch (Exception ex)
            {
                rsp.estado = false;
                rsp.mgs = ex.Message;
            }
            return Ok(rsp);
        }

        [HttpGet]
        [Route("ListarPorUsuario/{id}")]
        public async Task<IActionResult> ListarPorUsuario(string id)
        {
            var rsp = new Respuesta<List<PublicacionesDTO>>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _publicacionesServicio.ListarPorUsuario(id);
            }
            catch (Exception ex)
            {
                rsp.estado = false;
                rsp.mgs = ex.Message;
            }
            return Ok(rsp);
        }

        [HttpGet]
        [Route("FotosPublicaciones/{id}")]
        public async Task<IActionResult> FotosPublicaciones(string id)
        {
            var rsp = new Respuesta<List<FotosPublicacionesDTO>>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _publicacionesServicio.FotosPublicaciones(id);
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
        public async Task<IActionResult> Guardar([FromBody] PublicacionesDTO publicaciones)
        {
            var rsp = new Respuesta<PublicacionesDTO>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _publicacionesServicio.Crear(publicaciones);
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
        public async Task<IActionResult> Editar([FromBody] PublicacionesDTO publicaciones)
        {
            var rsp = new Respuesta<bool>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _publicacionesServicio.Editar(publicaciones);
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
                rsp.Valor = await _publicacionesServicio.Eliminar(id);
            }
            catch (Exception ex)
            {
                rsp.estado = false;
                rsp.mgs = ex.Message;
            }
            return Ok(rsp);
        }

        [HttpGet]
        [Route("ObtenerIdNuevaPublicacion")]
        public async Task<IActionResult> ObtenerIdNuevaPublicacion()
        {
            var rsp = new Respuesta<string>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _publicacionesServicio.ObtenerIdNuevaPublicacion();
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