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
    public class FotosPublicacionesServicio : IFotosPublicacionesServicio
    {
        private readonly IRepositorioGenerico<FotosPublicaciones> _fotosPublicacionesRepositorio;
        private readonly IMapper _mapper;
        public FotosPublicacionesServicio(IRepositorioGenerico<FotosPublicaciones> fotosPublicacionesRepositorio, IMapper mapper)
        {
            _fotosPublicacionesRepositorio = fotosPublicacionesRepositorio;
            _mapper = mapper;
        }

        public async Task<FotosPublicacionesDTO> Buscar(string id)
        {
            try
            {
                var fotosPublicacionesEncontrada = await _fotosPublicacionesRepositorio.Obtener(x => x.Id == id);
                if (fotosPublicacionesEncontrada == null)
                    throw new TaskCanceledException("La foto de la publicacion no existe");
                return _mapper.Map<FotosPublicacionesDTO>(fotosPublicacionesEncontrada);
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<FotosPublicacionesDTO>> BuscarFotosPublicacion(string id)
        {
            try
            {
                var queryFotos = await _fotosPublicacionesRepositorio.Consultar();
                var listaFiltrada = queryFotos
                    .Where(x => x.IdPublicacion == id)
                    .ToList();

                if (listaFiltrada == null || !listaFiltrada.Any())
                    throw new TaskCanceledException("No se encontraron fotos para la publicacion especificada");
                return _mapper.Map<List<FotosPublicacionesDTO>>(listaFiltrada);
            }
            catch
            {
                throw;
            }
        }

        public async Task<FotosPublicacionesDTO> Crear(FotosPublicacionesDTO modelo)
        {
            try
            {
                var fotosPublicacionesCreada = await _fotosPublicacionesRepositorio.Crear(_mapper.Map<FotosPublicaciones>(modelo));
                if (fotosPublicacionesCreada.Id == null)
                    throw new Exception("No se pudo crear");
                return _mapper.Map<FotosPublicacionesDTO>(fotosPublicacionesCreada);
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(FotosPublicacionesDTO modelo)
        {
            try
            {
                var fotosPublicacionesModelo = _mapper.Map<FotosPublicaciones>(modelo);
                var fotosPublicacionesEncontrada = await _fotosPublicacionesRepositorio.Obtener(x => x.Id == modelo.Id);
                if (fotosPublicacionesEncontrada == null)
                    throw new TaskCanceledException("La foto de la publicacion no existe");
                fotosPublicacionesEncontrada.Foto = fotosPublicacionesModelo.Foto;
                bool respuesta = await _fotosPublicacionesRepositorio.Editar(fotosPublicacionesEncontrada);
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
                var fotosPublicacionesEncontrada = await _fotosPublicacionesRepositorio.Obtener(x => x.Id == id);
                if (fotosPublicacionesEncontrada == null)
                    throw new TaskCanceledException("La categoria publicacion no existe");
                bool respuesta = await _fotosPublicacionesRepositorio.Eliminar(fotosPublicacionesEncontrada);
                if (!respuesta)
                    throw new TaskCanceledException("No se pudo eliminar");
                return respuesta;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<FotosPublicacionesDTO>> Listar()
        {
            try
            {
                var queryFotosPublicaciones = await _fotosPublicacionesRepositorio.Consultar();
                var listaFotosPublicaciones = queryFotosPublicaciones.ToList();

                return _mapper.Map<List<FotosPublicacionesDTO>>(listaFotosPublicaciones);
            }
            catch
            {
                throw;
            }
        }
    }
}
