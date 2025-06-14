﻿using API.Utilidad;
using BLL.Servicios;
using BLL.Servicios.Contrato;
using DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikesController : ControllerBase
    {
        private readonly ILikesServicio _likesServicio;
        public LikesController(ILikesServicio likesServicio)
        {
            _likesServicio = likesServicio;
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] LikesDTO likes)
        {
            var rsp = new Respuesta<LikesDTO>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _likesServicio.Crear(likes);
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
                rsp.Valor = await _likesServicio.Eliminar(id);
            }
            catch (Exception ex)
            {
                rsp.estado = false;
                rsp.mgs = ex.Message;
            }
            return Ok(rsp);
        }

        [HttpGet]
        [Route("VerificarLike/{idResenia}/{idPersona}")]
        public async Task<IActionResult> VerificarLike(string idResenia, string idPersona)
        {
            var rsp = new Respuesta<LikesDTO>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _likesServicio.VerificarLike(idResenia, idPersona);
            }
            catch (Exception ex)
            {
                rsp.estado = false;
                rsp.mgs = ex.Message;
            }
            return Ok(rsp);
        }

        [HttpGet]
        [Route("ContarLikes/{idResenia}")]
        public async Task<IActionResult> ContarLikes(string idResenia)
        {
            var rsp = new Respuesta<int>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _likesServicio.ContarLikes(idResenia);
            }
            catch (Exception ex)
            {
                rsp.estado = false;
                rsp.mgs = ex.Message;
            }
            return Ok(rsp);
        }

        [HttpDelete]
        [Route("EliminarPorResenia/{idResenia}/{idPersona}")]
        public async Task<IActionResult> EliminarPorResenia(string idResenia, string idPersona)
        {
            var rsp = new Respuesta<bool>();
            try
            {
                rsp.estado = true;
                rsp.Valor = await _likesServicio.EliminarPorResenia(idResenia, idPersona);
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