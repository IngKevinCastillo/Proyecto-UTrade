using AutoMapper;
using BLL.Servicios.Contrato;
using DAL.Repositorios.Contrato;
using DTO;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Servicios
{
    public class LikesServicio : ILikesServicio
    {
        private readonly IRepositorioGenerico<Likes> _likesRepositorio;
        private readonly IMapper _mapper;
        public LikesServicio(IRepositorioGenerico<Likes> likesRepositorio, IMapper mapper)
        {
            _likesRepositorio = likesRepositorio;
            _mapper = mapper;
        }

        public async Task<LikesDTO> Crear(LikesDTO modelo)
        {
            try
            {
                modelo.Id = await GenerarId();
                var likeCreado = await _likesRepositorio.Crear(_mapper.Map<Likes>(modelo));
                if (likeCreado.Id == null)
                    throw new Exception("No se pudo crear");
                return _mapper.Map<LikesDTO>(likeCreado);
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Eliminar(string id)
        {
            try
            {
                var likeEncontrado = await _likesRepositorio.Obtener(x => x.Id == id);
                if (likeEncontrado == null)
                    throw new TaskCanceledException("El like no existe");
                bool respuesta = await _likesRepositorio.Eliminar(likeEncontrado);
                if (!respuesta)
                    throw new TaskCanceledException("No se pudo eliminar");
                return respuesta;
            }
            catch
            {
                throw;
            }
        }

        public async Task<string> GenerarId()
        {
            var mensajes = await _likesRepositorio.Consultar();

            var numerosExistentes = mensajes
                .Where(m => m.Id != null && m.Id.StartsWith("LK"))
                .AsEnumerable()
                .Select(m => {
                    var parteNumero = m.Id.Substring(2);
                    if (int.TryParse(parteNumero, out int numero))
                        return numero;
                    return 0;
                });

            int maxNumero = numerosExistentes.Any() ? numerosExistentes.Max() : 0;
            int nuevoNumero = maxNumero + 1;
            string nuevoId = $"LK{nuevoNumero.ToString("D5")}";

            return nuevoId;
        }

        public async Task<LikesDTO> VerificarLike(string idResenia, string idPersona)
        {
            try
            {
                var likeEncontrado = await _likesRepositorio.Obtener(x => x.IdReseña == idResenia && x.IdPersona == idPersona);
                return likeEncontrado != null ? _mapper.Map<LikesDTO>(likeEncontrado) : null;
            }
            catch
            {
                throw;
            }
        }

        public async Task<int> ContarLikes(string idResenia)
        {
            try
            {
                var likes = await _likesRepositorio.Consultar(x => x.IdReseña == idResenia);
                return likes.Count();
            }
            catch
            {
                throw;
            }
        }

        // CAMBIO: Usar IdReseña en lugar de IdResenia
        public async Task<bool> EliminarPorResenia(string idResenia, string idPersona)
        {
            try
            {
                var likeEncontrado = await _likesRepositorio.Obtener(x => x.IdReseña == idResenia && x.IdPersona == idPersona);
                if (likeEncontrado == null)
                    throw new TaskCanceledException("El like no existe");

                bool respuesta = await _likesRepositorio.Eliminar(likeEncontrado);
                if (!respuesta)
                    throw new TaskCanceledException("No se pudo eliminar");
                return respuesta;
            }
            catch
            {
                throw;
            }
        }
    }
}