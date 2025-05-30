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
    public class FavoritosServicio : IFavoritosServicio
    {
        private readonly IRepositorioGenerico<Favoritos> _favoritosRepositorio;
        private readonly IMapper _mapper;

        public FavoritosServicio(IRepositorioGenerico<Favoritos> favoritosRepositorio, IMapper mapper)
        {
            _favoritosRepositorio = favoritosRepositorio;
            _mapper = mapper;
        }

        public async Task<List<FavoritosDTO>> BuscarPorUsuario(string id)
        {
            var favoritos = await _favoritosRepositorio.Consultar(f => f.IdPersona == id);
            return _mapper.Map<List<FavoritosDTO>>(favoritos);
        }

        public async Task<FavoritosDTO> Crear(FavoritosDTO modelo)
        {
            modelo.Id = await GenerarId();
            var favorito = _mapper.Map<Favoritos>(modelo);
            var creado = await _favoritosRepositorio.Crear(favorito);
            return _mapper.Map<FavoritosDTO>(creado);
        }

        public async Task<bool> EliminarUsuarioPublicacion(string idUsuario, string idPublicacion)
        {
            var favorito = await _favoritosRepositorio.Obtener(f => f.IdPersona == idUsuario && f.IdPublicacion == idPublicacion);
            if (favorito == null)
            {
                return false;
            }
            return await _favoritosRepositorio.Eliminar(favorito);
        }

        public async Task<bool> VerificarFavorito(string idUsuario, string idPublicacion)
        {
            var favorito = await _favoritosRepositorio.Obtener(f => f.IdPersona == idUsuario && f.IdPublicacion == idPublicacion);
            return favorito != null;
        }

        public async Task<string> GenerarId()
        {
            var mensajes = await _favoritosRepositorio.Consultar();

            var numerosExistentes = mensajes
                .Where(m => m.Id != null && m.Id.StartsWith("FAV"))
                .AsEnumerable()
                .Select(m => {
                    var parteNumero = m.Id.Substring(3);
                    if (int.TryParse(parteNumero, out int numero))
                        return numero;
                    return 0;
                });

            int maxNumero = numerosExistentes.Any() ? numerosExistentes.Max() : 0;
            int nuevoNumero = maxNumero + 1;
            string nuevoId = $"FAV{nuevoNumero.ToString("D5")}";

            return nuevoId;
        }
    }
}
