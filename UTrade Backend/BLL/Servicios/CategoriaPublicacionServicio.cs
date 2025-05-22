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
    public class CategoriaPublicacionServicio : ICategoriaPublicacionServicio
    {
        private readonly IRepositorioGenerico<CategoriaPublicacion> _categoriaPublicacionRepositorio;
        private readonly IMapper _mapper;
        public CategoriaPublicacionServicio(IRepositorioGenerico<CategoriaPublicacion> categoriaPublicacionRepositorio, IMapper mapper)
        {
            _categoriaPublicacionRepositorio = categoriaPublicacionRepositorio;
            _mapper = mapper;
        }

        public async Task<CategoriaPublicacionDTO> Buscar(string id)
        {
            try
            {
                var categoriaPublicacionEncontrada = await _categoriaPublicacionRepositorio.Obtener(x => x.Id == id);
                if (categoriaPublicacionEncontrada == null)
                    throw new TaskCanceledException("La Categoria publicacion no existe");
                return _mapper.Map<CategoriaPublicacionDTO>(categoriaPublicacionEncontrada);
            }
            catch
            {
                throw;
            }
        }

        public async Task<CategoriaPublicacionDTO> Crear(CategoriaPublicacionDTO modelo)
        {
            try
            {
                var categoriaPublicacionCreada = await _categoriaPublicacionRepositorio.Crear(_mapper.Map<CategoriaPublicacion>(modelo));
                if (categoriaPublicacionCreada.Id == null)
                    throw new Exception("No se pudo crear");
                return _mapper.Map<CategoriaPublicacionDTO>(categoriaPublicacionCreada);
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(CategoriaPublicacionDTO modelo)
        {
            try
            {
                var categoriaPublicacionModelo = _mapper.Map<CategoriaPublicacion>(modelo);
                var categoriaPublicacionEncontrada = await _categoriaPublicacionRepositorio.Obtener(x => x.Id == modelo.Id);
                if (categoriaPublicacionEncontrada == null)
                    throw new TaskCanceledException("La categoria publicacion no existe");
                categoriaPublicacionEncontrada.Nombre = categoriaPublicacionModelo.Nombre;
                bool respuesta = await _categoriaPublicacionRepositorio.Editar(categoriaPublicacionEncontrada);
                if (!respuesta)
                    throw new TaskCanceledException("No se pudo editar");
                return respuesta;
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
                var categoriaPublicacionEncontrada = await _categoriaPublicacionRepositorio.Obtener(x => x.Id == id);
                if (categoriaPublicacionEncontrada == null)
                    throw new TaskCanceledException("La categoria publicacion no existe");
                bool respuesta = await _categoriaPublicacionRepositorio.Eliminar(categoriaPublicacionEncontrada);
                if (!respuesta)
                    throw new TaskCanceledException("No se pudo eliminar");
                return respuesta;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<CategoriaPublicacionDTO>> Listar()
        {
            try
            {
                var queryCategoriaPublicacion = await _categoriaPublicacionRepositorio.Consultar();
                var listaCategoriaPublicaciones = queryCategoriaPublicacion.ToList();

                return _mapper.Map<List<CategoriaPublicacionDTO>>(listaCategoriaPublicaciones);
            }
            catch
            {
                throw;
            }
        }
    }
}
