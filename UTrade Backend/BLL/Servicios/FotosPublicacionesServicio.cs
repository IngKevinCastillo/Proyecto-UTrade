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
                if (!string.IsNullOrEmpty(modelo.FotoBase64) && modelo.Foto == null)
                {
                    modelo.Foto = Convert.FromBase64String(modelo.FotoBase64);
                }

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
                var fotosPublicacionesEncontrada = await _fotosPublicacionesRepositorio.Obtener(x => x.Id == modelo.Id);
                if (fotosPublicacionesEncontrada == null)
                    throw new TaskCanceledException("La foto de la publicacion no existe");
                if (!string.IsNullOrEmpty(modelo.FotoBase64))
                {
                    fotosPublicacionesEncontrada.Foto = Convert.FromBase64String(modelo.FotoBase64);
                }
                else if (modelo.Foto != null)
                {
                    fotosPublicacionesEncontrada.Foto = modelo.Foto;
                }

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
                    throw new TaskCanceledException("La foto de la publicacion no existe");
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

        public async Task<string> ObtenerIdNuevaFotoPublicacion()
        {
            try
            {
                var fotosPublicaciones = await _fotosPublicacionesRepositorio.Consultar();
                var listaIds = fotosPublicaciones
                    .ToList()
                    .Select(f => f.Id)
                    .Where(id => !string.IsNullOrEmpty(id) && id.StartsWith("FP"))
                    .Select(id =>
                    {
                        var numeroStr = id.Substring(2);
                        return int.TryParse(numeroStr, out int numero) ? numero : 0;
                    })
                    .ToList();

                int maxNumero = listaIds.Any() ? listaIds.Max() : 0;
                int nuevoNumero = maxNumero + 1;

                return $"FP{nuevoNumero.ToString("D2")}";
            }
            catch
            {
                throw;
            }
        }
    }
}