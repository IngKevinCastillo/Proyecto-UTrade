using AutoMapper;
using BLL.Servicios.Contrato;
using DAL.Repositorios.Contrato;
using DTO;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

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
                modelo.Fecha = DateTime.Now;
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
                var reseniaExistente = await _reseniaRepositorio.Obtener(x => x.Id == modelo.Id);
                if (reseniaExistente == null)
                    throw new TaskCanceledException("La Reseña no existe");

                reseniaExistente.Comentario = modelo.Comentario;
                reseniaExistente.Verificado = modelo.Verificado;

                return await _reseniaRepositorio.Editar(reseniaExistente);
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
                var listaMaterializada = listaResenias.ToList();
                if (listaMaterializada == null || !listaMaterializada.Any())
                    throw new TaskCanceledException("No hay Reseñas");

                return _mapper.Map<List<ReseñaDTO>>(listaMaterializada);
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
                var listaMaterializada = listaResenias.ToList();

                if (listaMaterializada == null || !listaMaterializada.Any())
                    throw new TaskCanceledException("No hay Reseñas");

                return _mapper.Map<List<ReseñaDTO>>(listaMaterializada);
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
                var listaMaterializada = listaResenias.ToList();

                if (listaMaterializada == null || !listaMaterializada.Any())
                    throw new TaskCanceledException("No hay Reseñas");

                return _mapper.Map<List<ReseñaDTO>>(listaMaterializada);
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
                var listaMaterializada = listaResenias.ToList();

                if (listaMaterializada == null || !listaMaterializada.Any())
                    throw new TaskCanceledException("No hay Reseñas");

                return _mapper.Map<List<ReseñaDTO>>(listaMaterializada);
            }
            catch
            {
                throw;
            }
        }
    }
}