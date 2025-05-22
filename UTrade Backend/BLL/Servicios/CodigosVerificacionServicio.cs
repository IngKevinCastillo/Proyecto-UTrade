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
    public class CodigosVerificacionServicio : ICodigosVerificacionServicio
    {
        private readonly IRepositorioGenerico<CodigosVerificacion> _codigosVerificacionRepositorio;
        private readonly IMapper _mapper;
        public CodigosVerificacionServicio(IRepositorioGenerico<CodigosVerificacion> codigosVerificacionRepositorio, IMapper mapper)
        {
            _codigosVerificacionRepositorio = codigosVerificacionRepositorio;
            _mapper = mapper;
        }

        public async Task<CodigosVerificacionDTO> Buscar(string id)
        {
            try
            {
                var codigosVerificacionEncontrada = await _codigosVerificacionRepositorio.Obtener(x => x.Id == id);
                if (codigosVerificacionEncontrada == null)
                    throw new TaskCanceledException("EL codigo verificacion no existe");
                return _mapper.Map<CodigosVerificacionDTO>(codigosVerificacionEncontrada);
            }
            catch
            {
                throw;
            }
        }

        public async Task<CodigosVerificacionDTO> Crear(CodigosVerificacionDTO modelo)
        {
            try
            {
                var codigosVerificacionCreada = await _codigosVerificacionRepositorio.Crear(_mapper.Map<CodigosVerificacion>(modelo));
                if (codigosVerificacionCreada.Id == null)
                    throw new Exception("No se pudo crear");
                return _mapper.Map<CodigosVerificacionDTO>(codigosVerificacionCreada);
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<CodigosVerificacionDTO>> Listar()
        {
            try
            {
                var queryCodigosVerificacion = await _codigosVerificacionRepositorio.Consultar();
                var listaCodigosVerificacion = queryCodigosVerificacion.ToList();

                return _mapper.Map<List<CodigosVerificacionDTO>>(listaCodigosVerificacion);
            }
            catch
            {
                throw;
            }
        }
    }
}
