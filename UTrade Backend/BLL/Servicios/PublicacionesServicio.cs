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
                publicacionEncontrada.Direccion = publicacionModelo?.Direccion;
                publicacionEncontrada.IdEstado = publicacionModelo?.IdEstado;
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
                var queryfotos = await _fotosPublicacionesServicio.BuscarFotosPublicacion(idPublicacion);

                if (queryfotos == null || !queryfotos.Any())
                    throw new TaskCanceledException("No se encontraron fotos para la categoría especificada");
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
                var listaPublicaciones = queryPublicacion
                    .OrderByDescending(x => x.FechaPublicacion)
                    .ToList();

                return _mapper.Map<List<PublicacionesDTO>>(listaPublicaciones);
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<PublicacionesDTO>> ListarSoloConLongitudLatitud()
        {
            try
            {
                var queryPublicacion = await _publicacionesRepositorio.Consultar();
                var listaPublicaciones = queryPublicacion.ToList();

                if (listaPublicaciones == null || !listaPublicaciones.Any())
                    throw new TaskCanceledException("No se encontraron publicaciones");

                var publicacionesConLongitudLatitud = listaPublicaciones
                    .Where(p => p.Latitud != null && p.Altitud != null && p.IdEstado == "EST01")
                    .ToList();

                return _mapper.Map<List<PublicacionesDTO>>(publicacionesConLongitudLatitud);
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
                    .Where(x => x.IdCategoria == idCategoria && x.IdEstado == "EST01")
                    .OrderByDescending(x => x.FechaPublicacion)
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

        public async Task<List<PublicacionesDTO>> listarActivos()
        {
            try
            {
                var queryPublicacion = await _publicacionesRepositorio.Consultar();

                var listaFiltrada = queryPublicacion
                    .Where(x => x.IdEstado == "EST01")
                    .OrderByDescending(x => x.FechaPublicacion)
                    .ToList();

                if (listaFiltrada == null || !listaFiltrada.Any())
                    throw new TaskCanceledException("No se encontraron publicaciones para el usuario especificado");

                return _mapper.Map<List<PublicacionesDTO>>(listaFiltrada);
            }
            catch
            {
                throw;
            }
        }


        public async Task<List<PublicacionesDTO>> busquedaTexto(string textoBusqueda)
        {
            var publicaciones = listarActivos();
            try
            {
                var listaPublicaciones = await publicaciones;
                if (listaPublicaciones == null || !listaPublicaciones.Any())
                    throw new TaskCanceledException("No se encontraron publicaciones");
                var publicacionesFiltradas = listaPublicaciones
                    .Where(p => p.Titulo.Contains(textoBusqueda, StringComparison.OrdinalIgnoreCase))
                    .ToList();
                return publicacionesFiltradas;
            }
            catch
            {
                throw;
            }
        }

        public Task<List<PublicacionesDTO>> ListarRangoPrecio(decimal precioMinimo, decimal precioMaximo)
        {
            try
            {
                var publicaciones = listarActivos();
                var listaPublicaciones = publicaciones.Result;
                if (listaPublicaciones == null || !listaPublicaciones.Any())
                    throw new TaskCanceledException("No se encontraron publicaciones");
                var publicacionesFiltradas = listaPublicaciones
                    .Where(p => p.Precio >= precioMinimo && p.Precio <= precioMaximo)
                    .ToList();
                return Task.FromResult(_mapper.Map<List<PublicacionesDTO>>(publicacionesFiltradas));
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<PublicacionesDTO>> ListarMaxOMinPrecio(string tipoFiltro)
        {
            try
            {
                var listaPublicaciones = await listarActivos();

                if (listaPublicaciones == null || !listaPublicaciones.Any())
                    throw new TaskCanceledException("No se encontraron publicaciones");

                List<PublicacionesDTO> publicacionesOrdenadas;

                if (tipoFiltro == "max")
                {
                    publicacionesOrdenadas = listaPublicaciones
                        .OrderByDescending(p => p.Precio)
                        .ToList();
                }
                else if (tipoFiltro == "min")
                {
                    publicacionesOrdenadas = listaPublicaciones
                        .OrderBy(p => p.Precio)
                        .ToList();
                }
                else
                {
                    throw new ArgumentException("Tipo de filtro no válido. Use 'max' o 'min'.");
                }

                return _mapper.Map<List<PublicacionesDTO>>(publicacionesOrdenadas);
            }
            catch
            {
                throw;
            }
        }


        public async Task<List<PublicacionesDTO>> ListarPorFecha(string tipoFiltro)
        {
            var listaPublicaciones = await listarActivos();
            var fechaActual = DateTime.Now;

            try
            {
                if (listaPublicaciones == null || !listaPublicaciones.Any())
                    throw new TaskCanceledException("No se encontraron publicaciones");

                List<PublicacionesDTO> publicacionesFiltradas;

                if (tipoFiltro == "hoy")
                {
                    publicacionesFiltradas = listaPublicaciones
                        .Where(p => p.FechaPublicacion.Date == fechaActual.Date)
                        .ToList();
                }
                else if (tipoFiltro == "semana")
                {
                    var inicioSemana = fechaActual.Date.AddDays(-(int)fechaActual.DayOfWeek);
                    var finSemana = inicioSemana.AddDays(6);

                    publicacionesFiltradas = listaPublicaciones
                        .Where(p => p.FechaPublicacion.Date >= inicioSemana && p.FechaPublicacion.Date <= finSemana)
                        .ToList();
                }
                else if (tipoFiltro == "mes")
                {
                    publicacionesFiltradas = listaPublicaciones
                        .Where(p => p.FechaPublicacion.Month == fechaActual.Month && p.FechaPublicacion.Year == fechaActual.Year)
                        .ToList();
                }
                else if (tipoFiltro == "año")
                {
                    publicacionesFiltradas = listaPublicaciones
                        .Where(p => p.FechaPublicacion.Year == fechaActual.Year)
                        .ToList();
                }
                else if (tipoFiltro == "ultimaHora")
                {
                    var horaLimite = fechaActual.AddHours(-1);
                    publicacionesFiltradas = listaPublicaciones
                        .Where(p => p.FechaPublicacion >= horaLimite && p.FechaPublicacion <= fechaActual)
                        .ToList();
                }
                else
                {
                    throw new ArgumentException("Tipo de filtro no válido. Use 'hoy', 'semana', 'mes', 'año' o 'ultimaHora'.");
                }

                return publicacionesFiltradas;
            }
            catch
            {
                throw;
            }
        }
    }
}