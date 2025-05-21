using AutoMapper;
using BLL.Servicios.Contrato;
using DAL.Repositorios.Contrato;
using DTO;
using Model;

namespace BLL.Servicios
{
    public class RolServicio : IRolServicio
    {
        private readonly IRepositorioGenerico<Rol> _rolRepositorio;
        private readonly IMapper _mapper;
        public RolServicio(IRepositorioGenerico<Rol> rolRepositorio, IMapper mapper)
        {
            _rolRepositorio = rolRepositorio;
            _mapper = mapper;
        }
        public async Task<RolDTO> Crear(RolDTO modelo)
        {
            try
            {
                var rolCreado = await _rolRepositorio.Crear(_mapper.Map<Rol>(modelo));
                if (rolCreado.Id == null)
                    throw new Exception("No se pudo crear");
                return _mapper.Map<RolDTO>(rolCreado);
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(RolDTO modelo)
        {
            try
            {
                var rolModelo = _mapper.Map<Rol>(modelo);
                var rolEncontrado = await _rolRepositorio.Obtener(x => x.Id == modelo.Id);
                if (rolEncontrado == null)
                    throw new TaskCanceledException("El rol no existe");
                rolEncontrado.Nombre = rolModelo.Nombre;
                bool respuesta = await _rolRepositorio.Editar(rolEncontrado);
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
                var rolEncontrada = await _rolRepositorio.Obtener(x => x.Id == id);
                if (rolEncontrada == null)
                    throw new TaskCanceledException("El rol no existe");
                bool respuesta = await _rolRepositorio.Eliminar(rolEncontrada);
                if (!respuesta)
                    throw new TaskCanceledException("No se pudo eliminar");
                return respuesta;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<RolDTO>> Listar()
        {
            try
            {
                var queryRol = await _rolRepositorio.Consultar();
                var listaRol = queryRol.ToList();

                return _mapper.Map<List<RolDTO>>(listaRol);
            }
            catch
            {
                throw;
            }
        }
    }
}
