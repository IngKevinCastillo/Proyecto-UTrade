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
            CreateMap<CrearChatDTO, Chat>();
            CreateMap<Chat, ChatDTO>()
                .ForMember(dest => dest.Usuario1, opt => opt.Ignore())
                .ForMember(dest => dest.Usuario2, opt => opt.Ignore())
                .ForMember(dest => dest.Mensajes, opt => opt.Ignore());

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
            CreateMap<CrearMensajeDTO, Mensajes>()
                .ForMember(dest => dest.Mensaje1, opt => opt.MapFrom(src => src.Mensaje));


            #endregion

            #region MotivosReporte
            CreateMap<MotivosReporte, MotivosReporteDTO>().ReverseMap();
            #endregion

            #region Notificaciones
            CreateMap<Notificaciones, NotificacionesDTO>().ReverseMap();
            #endregion

            #region Persona
            CreateMap<Persona, PersonaDTO>()
            .ForMember(dest => dest.FotoPerfilBase64, opt => opt.MapFrom(src =>
                src.FotoPerfil != null ? Convert.ToBase64String(src.FotoPerfil) : null
            ));

            CreateMap<PersonaDTO, Persona>()
                .ForMember(dest => dest.FotoPerfil, opt => opt.MapFrom(src =>
                    !string.IsNullOrEmpty(src.FotoPerfilBase64) ? Convert.FromBase64String(src.FotoPerfilBase64) : null
                ));
            CreateMap<Persona, SesionDTO>()
            .ForMember(dest => dest.IdUsuario, opt => opt.MapFrom(src => src.Id))
            .ReverseMap();
            #endregion

            #region Publicaciones
            CreateMap<Publicaciones, PublicacionesDTO>()
                .ForMember(dest => dest.Precio, opt => opt.MapFrom(src =>
                    Convert.ToString(src.Precio, cultura)))
                .ForMember(dest => dest.fotosPublicaciones, opt => opt.MapFrom(src => src.FotosPublicaciones));

            CreateMap<PublicacionesDTO, Publicaciones>()
                .ForMember(dest => dest.Precio, opt => opt.MapFrom(src =>
                    Convert.ToDecimal(src.Precio, cultura)))
                .ForMember(dest => dest.FotosPublicaciones, opt => opt.MapFrom(src => src.fotosPublicaciones));
            #endregion

            #region Razones
            CreateMap<Razones, RazonesDTO>().ReverseMap();
            #endregion

            #region Reportes
            // De entidad a DTO
            CreateMap<Reportes, ReportesDTO>()
                .ForMember(dest => dest.IdEstado, opt => opt.MapFrom(src => src.IdEstado))
                .ForMember(dest => dest.IdMotivo, opt => opt.MapFrom(src => src.IdMotivo))
                .ForMember(dest => dest.IdTipoReporte, opt => opt.MapFrom(src => src.IdTipoReporte))
                .ForMember(dest => dest.IdReportado, opt => opt.MapFrom(src => src.IdReportado))
                .ForMember(dest => dest.IdReportante, opt => opt.MapFrom(src => src.IdReportante))
                .ReverseMap();
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

            #region MensajeAccion
            CreateMap<MensajeAccion, MensajeAccionDTO>().ReverseMap();
            #endregion

            #region Estados
            CreateMap<Estados, EstadosDTO>().ReverseMap();
            #endregion



        }
    }
}