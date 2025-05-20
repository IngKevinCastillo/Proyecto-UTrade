using AutoMapper;
using DTO;
using Microsoft.IdentityModel.Tokens;
using Model;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Utility
{
    public class PerfilAutoMapper : Profile
    {
        public PerfilAutoMapper()
        {
            var cultura = new CultureInfo("es-CO");

            #region ArchivosAdjuntos
            CreateMap<ArchivosAdjuntos, ArchivosAdjuntosDTO>().ReverseMap();
            #endregion

            #region CategoriaPublicacion
            CreateMap<CategoriaPublicacion, CategoriaPublicacionDTO>().ReverseMap();
            #endregion

            #region Chat
            CreateMap<Chat, ChatDTO>().ReverseMap();
            #endregion

            #region Contactanos
            CreateMap<Contactanos, ContactanosDTO>().ReverseMap();
            #endregion

            #region EstadosReporte
            CreateMap<EstadosReporte, EstadosReporteDTO>().ReverseMap();
            #endregion

            #region Favoritos
            CreateMap<Favoritos, FavoritosDTO>().ReverseMap();
            #endregion

            #region FotosPublicaciones
            CreateMap<FotosPublicaciones, FotosPublicacionesDTO>().ReverseMap();
            #endregion

            #region Mensajes
            CreateMap<Mensajes, MensajesDTO>().ReverseMap();
            #endregion

            #region MotivosReporte
            CreateMap<MotivosReporte, MotivosReporteDTO>().ReverseMap();
            #endregion

            #region Notificaciones
            CreateMap<Notificaciones, NotificacionesDTO>().ReverseMap();
            #endregion

            #region Persona
            CreateMap<Persona, PersonaDTO>().ReverseMap();
            #endregion

            #region Publicaciones
            CreateMap<Publicaciones, PublicacionesDTO>()
                .ForMember(dest => dest.Precio, opt => opt.MapFrom(src =>
                    Convert.ToString(src.Precio, cultura)));

            CreateMap<PublicacionesDTO, Publicaciones>()
                .ForMember(dest => dest.Precio, opt => opt.MapFrom(src =>
                    Convert.ToDecimal(src.Precio, cultura)));
            #endregion

            #region Razones
            CreateMap<Razones, RazonesDTO>().ReverseMap();
            #endregion

            #region Reportes
            CreateMap<Reportes, ReportesDTO>().ReverseMap();
            #endregion

            #region Reseña
            CreateMap<Reseña, ReseñaDTO>().ReverseMap();
            #endregion

            #region Rol
            CreateMap<Rol, RolDTO>().ReverseMap();
            #endregion

            #region TipoAccion
            CreateMap<TipoAccion, TipoAccionDTO>().ReverseMap();
            #endregion

            #region TiposReporte
            CreateMap<TiposReporte, TiposReporteDTO>().ReverseMap();
            #endregion
        }
    }
}