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
        [HttpPost]
        [Route("Crear")]
        public async Task<IActionResult> Crear([FromBody] FavoritosDTO modelo)
        {
            var rsp = new Respuesta<FavoritosDTO>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _favoritosServicio.Crear(modelo);
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
            var rsp = new Respuesta<List<FavoritosDTO>>();
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

        [HttpDelete]
        [Route("EliminarUsuarioPublicacion/{idUsuario}/{idPublicacion}")]
        public async Task<IActionResult> EliminarUsuarioPublicacion(string idUsuario, string idPublicacion)
        {
            var rsp = new Respuesta<bool>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _favoritosServicio.EliminarUsuarioPublicacion(idUsuario, idPublicacion);
            }
            catch (Exception ex)
            {
                rsp.estado = false;
                rsp.mgs = ex.Message;
            }
            return Ok(rsp);
        }

        [HttpGet]
        [Route("VerificarFavorito/{idUsuario}/{idPublicacion}")]
        public async Task<IActionResult> VerificarFavorito(string idUsuario, string idPublicacion)
        {
            var rsp = new Respuesta<bool>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _favoritosServicio.VerificarFavorito(idUsuario, idPublicacion);
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
