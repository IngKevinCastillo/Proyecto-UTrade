using API.Utilidad;
using BLL.Servicios.Contrato;
using DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriaPublicacionController : ControllerBase
    {
        private readonly ICategoriaPublicacionServicio _categoriaPublicacionServicio;
        public CategoriaPublicacionController(ICategoriaPublicacionServicio categoriaPublicacionServicio)
        {
            _categoriaPublicacionServicio = categoriaPublicacionServicio;
        }
        [HttpGet]
        [Route("Listar")]
        public async Task<IActionResult> listar()
        {
            var rsp = new Respuesta<List<CategoriaPublicacionDTO>>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _categoriaPublicacionServicio.Listar();
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
            var rsp = new Respuesta<CategoriaPublicacionDTO>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _categoriaPublicacionServicio.Buscar(id);
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
        public async Task<IActionResult> Guardar([FromBody] CategoriaPublicacionDTO categoriaPublicacion)
        {
            var rsp = new Respuesta<CategoriaPublicacionDTO>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _categoriaPublicacionServicio.Crear(categoriaPublicacion);
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
        public async Task<IActionResult> Editar([FromBody] CategoriaPublicacionDTO categoriaPublicacion)
        {
            var rsp = new Respuesta<bool>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _categoriaPublicacionServicio.Editar(categoriaPublicacion);
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
                rsp.Valor = await _categoriaPublicacionServicio.Eliminar(id);
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
