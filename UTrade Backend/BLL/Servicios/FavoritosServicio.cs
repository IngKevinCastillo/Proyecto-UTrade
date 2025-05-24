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
    public class FavoritosServicio : IFavoritosServicio
    {
        private readonly IRepositorioGenerico<Favoritos> _favoritosRepositorio;
        private readonly IMapper _mapper;

        public FavoritosServicio(IRepositorioGenerico<Favoritos> favoritosRepositorio, IMapper mapper)
        {
            _favoritosRepositorio = favoritosRepositorio;
            _mapper = mapper;
        }

        public async Task<FavoritosDTO> Buscar(string id)
        {
            try
            {
                var favoritosEncontrado = await _favoritosRepositorio.Obtener(x => x.Id == id);
                if (favoritosEncontrado == null)
                    throw new TaskCanceledException("El Favorito no existe");
                return _mapper.Map<FavoritosDTO>(favoritosEncontrado);
            }
            catch
            {
                throw;
            }
        }

        public async Task<FavoritosDTO> BuscarPorPublicacion(string id)
        {
            try
            {
                var favoritosEncontrado = await _favoritosRepositorio.Obtener(x => x.IdPublicacion == id);
                if (favoritosEncontrado == null)
                    throw new TaskCanceledException("El Favorito no existe");
                return _mapper.Map<FavoritosDTO>(favoritosEncontrado);
            }
            catch
            {
                throw;
            }
        }

        public async Task<FavoritosDTO> BuscarPorUsuario(string id)
        {
            try
            {
                var favoritosEncontrado = await _favoritosRepositorio.Obtener(x => x.IdPersona == id);
                if (favoritosEncontrado == null)
                    throw new TaskCanceledException("El Favorito no existe");
                return _mapper.Map<FavoritosDTO>(favoritosEncontrado);
            }
            catch
            {
                throw;
            }
        }

        public async Task<FavoritosDTO> Crear(FavoritosDTO modelo)
        {
            try
            {
                var favoritosCreado = await _favoritosRepositorio.Crear(_mapper.Map<Favoritos>(modelo));
                if (favoritosCreado.Id == null)
                    throw new Exception("No se pudo crear");
                return _mapper.Map<FavoritosDTO>(favoritosCreado);
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
                var favoritosEncontrado = await _favoritosRepositorio.Obtener(x => x.Id == id);
                if (favoritosEncontrado == null)
                    throw new TaskCanceledException("El Favorito no existe");
                bool respuesta = await _favoritosRepositorio.Eliminar(favoritosEncontrado);
                if (!respuesta)
                    throw new TaskCanceledException("No se pudo eliminar");
                return respuesta;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> EliminarPorPublicacion(string id)
        {
            try
            {
                var favoritosEncontrado = await _favoritosRepositorio.Obtener(x => x.IdPublicacion == id);
                if (favoritosEncontrado == null)
                    throw new TaskCanceledException("El Favorito no existe");
                bool respuesta = await _favoritosRepositorio.Eliminar(favoritosEncontrado);
                if (!respuesta)
                    throw new TaskCanceledException("No se pudo eliminar");
                return respuesta;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> EliminarPorUsuario(string id)
        {
            try
            {
                var favoritosEncontrado = await _favoritosRepositorio.Obtener(x => x.IdPersona == id);
                if (favoritosEncontrado == null)
                    throw new TaskCanceledException("El Favorito no existe");
                bool respuesta = await _favoritosRepositorio.Eliminar(favoritosEncontrado);
                if (!respuesta)
                    throw new TaskCanceledException("No se pudo eliminar");
                return respuesta;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<FavoritosDTO>> Listar()
        {
            try
            {
                var favoritosListar = await _favoritosRepositorio.Consultar();
                if (favoritosListar == null)
                    throw new TaskCanceledException("No se encontraron Favoritos");
                return _mapper.Map<List<FavoritosDTO>>(favoritosListar.ToList());
            }
            catch
            {
                throw;
            }
        }
    }
}
