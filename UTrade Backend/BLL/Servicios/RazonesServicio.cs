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
    public class RazonesServicio : IRazonServicio
    {
        private readonly IRepositorioGenerico<Razones> _razonesRepositorio;
        private readonly IMapper _mapper;

        public RazonesServicio(IRepositorioGenerico<Razones> razonesRepositorio, IMapper mapper)
        {
            _razonesRepositorio = razonesRepositorio;
            _mapper = mapper;
        }

        public async Task<RazonesDTO> Buscar(string id)
        {
            try
            {
                var queryRazones = await _razonesRepositorio.Obtener(x => x.IdRazon == id);
                return _mapper.Map<RazonesDTO>(queryRazones);
            }
            catch
            {
                throw;
            }
        }

        public async Task<RazonesDTO> Crear(RazonesDTO modelo)
        {
            try
            {
                var razonesCreado = await _razonesRepositorio.Crear(_mapper.Map<Razones>(modelo));
                if (razonesCreado.IdRazon == null)
                    throw new Exception("No se pudo crear");
                return _mapper.Map<RazonesDTO>(razonesCreado);
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(RazonesDTO modelo)
        {
            try
            {
                var razonesModelo = _mapper.Map<Razones>(modelo);
                var razonesEncontrado = await _razonesRepositorio.Obtener(x => x.IdRazon == modelo.IdRazon);
                if (razonesEncontrado == null)
                    throw new TaskCanceledException("La razon no existe");
                razonesEncontrado.Nombre = razonesModelo.Nombre;
                return await _razonesRepositorio.Editar(razonesModelo);
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
                var razonesEncontrado = await _razonesRepositorio.Obtener(x => x.IdRazon == id);
                if (razonesEncontrado == null)
                    throw new TaskCanceledException("La razon no existe");
                return await _razonesRepositorio.Eliminar(razonesEncontrado);
            }
            catch
            {
                throw;
            }
        }

        async Task<List<RazonesDTO>> IRazonServicio.Listar()
        {
            try
            {
                var queryRazones = await _razonesRepositorio.Consultar();
                return _mapper.Map<List<RazonesDTO>>(queryRazones.ToList());
            }
            catch
            {
                throw;
            }
        }
    }
}
