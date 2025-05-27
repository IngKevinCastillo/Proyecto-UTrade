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
    }
}
