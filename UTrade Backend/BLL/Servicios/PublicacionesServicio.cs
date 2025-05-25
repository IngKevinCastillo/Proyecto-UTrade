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
    public class PublicacionesServicio : IPublicacionesServicio
    {
        private readonly IRepositorioGenerico<Publicaciones> _publicacionesRepositorio;
        private readonly IMapper _mapper;
        private readonly IFotosPublicacionesServicio _fotosPublicacionesServicio;
        private readonly IRepositorioGenerico<FotosPublicaciones> _fotosPublicaciones;

        public PublicacionesServicio(IRepositorioGenerico<Publicaciones> publicacionesRepositorio, IFotosPublicacionesServicio fotosPublicacionesServicio, IMapper mapper, IRepositorioGenerico<FotosPublicaciones> fotosPublicaciones)
        {
            _publicacionesRepositorio = publicacionesRepositorio;
            _fotosPublicacionesServicio = fotosPublicacionesServicio;
            _fotosPublicaciones = fotosPublicaciones;
            _mapper = mapper;
        }


        public async Task<PublicacionesDTO> Buscar(string id)
        {
            try
            {
                var publicacionEncontrada = await _publicacionesRepositorio.Obtener(x => x.Id == id);
                if (publicacionEncontrada == null)
                    throw new TaskCanceledException("Usuario no existe");
                return _mapper.Map<PublicacionesDTO>(publicacionEncontrada);
            }
            catch
            {
                throw;
            }
        }

        public async Task<PublicacionesDTO> Crear(PublicacionesDTO modelo)
        {
            try
            {
                var modeloActualizado = modelo;
                modeloActualizado.FechaPublicacion = DateTime.Now;
                var publicacionCreada = await _publicacionesRepositorio.Crear(_mapper.Map<Publicaciones>(modeloActualizado));
                if (publicacionCreada.Id == null)
                    throw new Exception("No se pudo crear");
                return _mapper.Map<PublicacionesDTO>(publicacionCreada);
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(PublicacionesDTO modelo)
        {
            try
            {
                var publicacionModelo = _mapper.Map<Publicaciones>(modelo);
                var publicacionEncontrada = await _publicacionesRepositorio.Obtener(x => x.Id == modelo.Id);
                if (publicacionEncontrada == null)
                    throw new TaskCanceledException("La publicacion no existe");
                publicacionEncontrada.Titulo = publicacionModelo.Titulo;
                publicacionEncontrada.FechaPublicacion = publicacionModelo.FechaPublicacion;
                publicacionEncontrada.Precio = publicacionModelo.Precio;
                publicacionEncontrada.IdCategoria = publicacionModelo.IdCategoria;
                publicacionEncontrada.Descripcion = publicacionModelo.Descripcion;
                publicacionEncontrada.Ubicacion = publicacionModelo.Ubicacion;
                publicacionEncontrada.Direccion = publicacionModelo?.Direccion;
                bool respuesta = await _publicacionesRepositorio.Editar(publicacionEncontrada);
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
                var publicacionEncontrada = await _publicacionesRepositorio.Obtener(x => x.Id == id);
                var fotosPublicacionEliminar = await _fotosPublicaciones.Consultar(x => x.IdPublicacion == id);
                var listaFotos = fotosPublicacionEliminar.ToList();
                foreach (var item in listaFotos)
                {
                    await _fotosPublicacionesServicio.Eliminar(item.Id);
                }

                if (publicacionEncontrada == null)
                    throw new TaskCanceledException("La publicacion no existe");
                bool respuesta = await _publicacionesRepositorio.Eliminar(publicacionEncontrada);
                if (!respuesta)
                    throw new TaskCanceledException("No se pudo eliminar");
                return respuesta;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<FotosPublicacionesDTO>> FotosPublicaciones(string idPublicacion)
        {
            try
            {
                //var publicacion = _mapper.Map<PublicacionesDTO>(await _publicacionesRepositorio.Obtener(x => x.Id == idPublicacion));
                var queryfotos = await _fotosPublicacionesServicio.BuscarFotosPublicacion(idPublicacion);

                if (queryfotos == null || !queryfotos.Any())
                    throw new TaskCanceledException("No se encontraron fotos para la categoría especificada");

                //publicacion.fotosPublicaciones = queryfotos;

                return _mapper.Map<List<FotosPublicacionesDTO>>(queryfotos);
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<PublicacionesDTO>> Listar()
        {
            try
            {
                var queryPublicacion = await _publicacionesRepositorio.Consultar();
                var listaPublicaciones = queryPublicacion.ToList();

                return _mapper.Map<List<PublicacionesDTO>>(listaPublicaciones);
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<PublicacionesDTO>> ListarPorCategoria(string idCategoria)
        {
            try
            {

                var queryPublicacion = await _publicacionesRepositorio.Consultar();
                var listaFiltrada = queryPublicacion
                    .Where(x => x.IdCategoria == idCategoria)
                    .ToList();

                if (listaFiltrada == null || !listaFiltrada.Any())
                    throw new TaskCanceledException("No se encontraron publicaciones para la categoría especificada");

                return _mapper.Map<List<PublicacionesDTO>>(listaFiltrada);
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<PublicacionesDTO>> ListarPorUsuario(string id)
        {
            try
            {

                var queryPublicacion = await _publicacionesRepositorio.Consultar();
                var listaFiltrada = queryPublicacion
                    .Where(x => x.IdUsuario == id)
                    .ToList();

                if (listaFiltrada == null || !listaFiltrada.Any())
                    throw new TaskCanceledException("No se encontraron publicaciones para el usuario especificada");

                return _mapper.Map<List<PublicacionesDTO>>(listaFiltrada);
            }
            catch
            {
                throw;
            }
        }

        public async Task<string> ObtenerIdNuevaPublicacion()
        {
            try
            {
                var publicaciones = await _publicacionesRepositorio.Consultar();
                var listaIds = publicaciones
                    .ToList()
                    .Select(p => p.Id)
                    .Where(id => !string.IsNullOrEmpty(id) && id.StartsWith("PUB"))
                    .Select(id =>
                    {
                        var numeroStr = id.Substring(3);
                        return int.TryParse(numeroStr, out int numero) ? numero : 0;
                    })
                    .ToList();

                int maxNumero = listaIds.Any() ? listaIds.Max() : 0;
                int nuevoNumero = maxNumero + 1;

                return $"PUB{nuevoNumero.ToString("D2")}"; 
            }
            catch
            {
                throw;
            }
        }
    }
}