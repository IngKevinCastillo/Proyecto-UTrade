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
    public class ReseniasServicio : IReseniaServicio
    {

        private readonly IRepositorioGenerico<Reseña> _reseniaRepositorio;
        private readonly IMapper _mapper;

        public ReseniasServicio(IRepositorioGenerico<Reseña> reseniaRepositorio, IMapper mapper)
        {
            _reseniaRepositorio = reseniaRepositorio;
            _mapper = mapper;
        }

        public async Task<ReseñaDTO> Buscar(string id)
        {
            try
            {
                var reseniaEncontrada = await _reseniaRepositorio.Obtener(x => x.Id == id);
                if (reseniaEncontrada == null)
                    throw new TaskCanceledException("La Reseña no existe");
                return _mapper.Map<ReseñaDTO>(reseniaEncontrada);
            }
            catch
            {
                throw;
            }
        }

        public async Task<ReseñaDTO> Crear(ReseñaDTO modelo)
        {
            try
            {
                var reseniaCreada = await _reseniaRepositorio.Crear(_mapper.Map<Reseña>(modelo));
                if (reseniaCreada.Id == null)
                    throw new Exception("No se pudo crear");
                return _mapper.Map<ReseñaDTO>(reseniaCreada);
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(ReseñaDTO modelo)
        {
            try
            {
                var reseniaModelo = _mapper.Map<Reseña>(modelo);
                var reseniaEncontrada = await _reseniaRepositorio.Obtener(x => x.Id == modelo.Id);
                if (reseniaEncontrada == null)
                    throw new TaskCanceledException("La Reseña no existe");
                return await _reseniaRepositorio.Editar(reseniaModelo);
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
                var reseniaEncontrada = await _reseniaRepositorio.Obtener(x => x.Id == id);
                if (reseniaEncontrada == null)
                    throw new TaskCanceledException("La Reseña no existe");
                return await _reseniaRepositorio.Eliminar(reseniaEncontrada);
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<ReseñaDTO>> Listar()
        {
            try
            {
                var listaResenias = await _reseniaRepositorio.Consultar();
                if (listaResenias == null)
                    throw new TaskCanceledException("No hay Reseñas");
                return _mapper.Map<List<ReseñaDTO>>(listaResenias);
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<ReseñaDTO>> ListarPorCalificacion(int calificacion)
        {
            try
            {
                var listaResenias = await _reseniaRepositorio.Consultar(x => x.Calificacion == calificacion);
                if (listaResenias == null)
                    throw new TaskCanceledException("No hay Reseñas");
                return _mapper.Map<List<ReseñaDTO>>(listaResenias);
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<ReseñaDTO>> ListarPorPersona(string idPersona)
        {
            try
            {
                var listaResenias = await _reseniaRepositorio.Consultar(x => x.IdPersona == idPersona);
                if (listaResenias == null)
                    throw new TaskCanceledException("No hay Reseñas");
                return _mapper.Map<List<ReseñaDTO>>(listaResenias);
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<ReseñaDTO>> ListarPorPublicacion(string idPublicacion)
        {
            try
            {
                var listaResenias = await _reseniaRepositorio.Consultar(x => x.IdPublicacion == idPublicacion);
                if (listaResenias == null)
                    throw new TaskCanceledException("No hay Reseñas");
                return _mapper.Map<List<ReseñaDTO>>(listaResenias);
            }
            catch
            {
                throw;
            }
        }
    }
}
