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
    public class EstadosServicio : IEstadosServicio
    {
        private readonly IRepositorioGenerico<Estados> _estadosRepositorio;
        private readonly IMapper _mapper;
        public EstadosServicio(IRepositorioGenerico<Estados> estadosRepositorio, IMapper mapper)
        {
            _estadosRepositorio = estadosRepositorio;
            _mapper = mapper;
        }

        public async Task<EstadosDTO> Buscar(string id)
        {
            try
            {
                var estadoEncontrado = await _estadosRepositorio.Obtener(x => x.Id == id);
                if (estadoEncontrado == null)
                    throw new TaskCanceledException("El estado no existe");
                return _mapper.Map<EstadosDTO>(estadoEncontrado);
            }
            catch
            {
                throw;
            }
        }

        public async Task<EstadosDTO> Crear(EstadosDTO modelo)
        {
            try
            {
                var estadoCreado = await _estadosRepositorio.Crear(_mapper.Map<Estados>(modelo));
                if (estadoCreado.Id == null)
                    throw new Exception("No se pudo crear");
                return _mapper.Map<EstadosDTO>(estadoCreado);
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(EstadosDTO modelo)
        {
            try
            {
                var estadoModelo = _mapper.Map<Estados>(modelo);
                var estadoEncontrado = await _estadosRepositorio.Obtener(x => x.Id == modelo.Id);
                if (estadoEncontrado == null)
                    throw new TaskCanceledException("El estado  no existe");
                estadoEncontrado.Nombre = estadoModelo.Nombre;
                bool respuesta = await _estadosRepositorio.Editar(estadoEncontrado);
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
                var estadoEncontrado = await _estadosRepositorio.Obtener(x => x.Id == id);
                if (estadoEncontrado == null)
                    throw new TaskCanceledException("El estado no existe");
                bool respuesta = await _estadosRepositorio.Eliminar(estadoEncontrado);
                if (!respuesta)
                    throw new TaskCanceledException("No se pudo eliminar");
                return respuesta;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<EstadosDTO>> Listar()
        {
            try
            {
                var queryEstado = await _estadosRepositorio.Consultar();
                var listaEstados = queryEstado.ToList();

                return _mapper.Map<List<EstadosDTO>>(listaEstados);
            }
            catch
            {
                throw;
            }
        }
    }
}
