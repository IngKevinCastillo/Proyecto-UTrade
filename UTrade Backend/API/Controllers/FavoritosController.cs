using API.Utilidad;
using BLL.Servicios.Contrato;
using DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritosController : ControllerBase
    {
        private readonly IFavoritosServicio _favoritosServicio;
        public FavoritosController(IFavoritosServicio favoritosServicio)
        {
            _favoritosServicio = favoritosServicio;
        }

        [HttpGet]
        [Route("Listar")]
        public async Task<IActionResult> listar()
        {
            var rsp = new Respuesta<List<FavoritosDTO>>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _favoritosServicio.Listar();
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
            var rsp = new Respuesta<FavoritosDTO>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _favoritosServicio.Buscar(id);
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
        public async Task<IActionResult> Guardar([FromBody] FavoritosDTO favoritos)
        {
            var rsp = new Respuesta<FavoritosDTO>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _favoritosServicio.Crear(favoritos);
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
                rsp.Valor = await _favoritosServicio.Eliminar(id);
            }
            catch (Exception ex)
            {
                rsp.estado = false;
                rsp.mgs = ex.Message;
            }
            return Ok(rsp);
        }

        [HttpGet]
        [Route("BuscarPorUsuario/{id}")]
        public async Task<IActionResult> BuscarPorUsuario(string id)
        {
            var rsp = new Respuesta<FavoritosDTO>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _favoritosServicio.BuscarPorUsuario(id);
            }
            catch (Exception ex)
            {
                rsp.estado = false;
                rsp.mgs = ex.Message;
            }
            return Ok(rsp);
        }

        [HttpGet]
        [Route("BuscarPorPublicacion/{id}")]
        public async Task<IActionResult> BuscarPorPublicacion(string id)
        {
            var rsp = new Respuesta<FavoritosDTO>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _favoritosServicio.BuscarPorPublicacion(id);
            }
            catch (Exception ex)
            {
                rsp.estado = false;
                rsp.mgs = ex.Message;
            }
            return Ok(rsp);
        }

        [HttpDelete]
        [Route("EliminarPorUsuario/{id}")]
        public async Task<IActionResult> EliminarPorUsuario(string id)
        {
            var rsp = new Respuesta<bool>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _favoritosServicio.EliminarPorUsuario(id);
            }
            catch (Exception ex)
            {
                rsp.estado = false;
                rsp.mgs = ex.Message;
            }
            return Ok(rsp);
        }

        [HttpDelete]
        [Route("EliminarPorPublicacion/{id}")]
        public async Task<IActionResult> EliminarPorPublicacion(string id)
        {
            var rsp = new Respuesta<bool>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _favoritosServicio.EliminarPorPublicacion(id);
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
