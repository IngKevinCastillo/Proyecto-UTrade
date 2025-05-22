using BLL.Servicios.Contrato;
using BLL.Servicios;
using DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Repositorios.Contrato;
using DAL.Repositorios;
using Utility;

namespace IOC
{
    public static class Dependencias
    {
        public static void InyectarDependencias(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<UtradedbContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("cadenaSQL"));
            });

            services.AddTransient(typeof(IRepositorioGenerico<>), typeof(RepositorioGenerico<>));
            services.AddAutoMapper(typeof(PerfilAutoMapper));
            services.AddScoped<IPersonaServicio, PersonaServicio>();
            services.AddScoped<IRolServicio, RolServicio>();
            services.AddScoped<INotificacionServicio, NotificacionServicio>();
            services.AddScoped<IReporteServicio, ReporteServicio>();
            services.AddScoped<ITipoReporteServicio, TipoReporteServicio>();
            services.AddScoped<IEstadoReporteServicio, EstadoReporteServicio>();
            services.AddScoped<IMotivoReporteServicio, MotivoReporteServicio>();

            services.AddScoped<ITipoAccionServicio, TipoAccionServicio>();
            services.AddScoped<IMensajeAccionServicio, MensajeAccionServicio>();
            services.AddScoped<IPublicacionesServicio, PublicacionesServicio>();
            services.AddScoped<ICategoriaPublicacionServicio, CategoriaPublicacionServicio>();
            services.AddScoped<IFotosPublicacionesServicio, FotosPublicacionesServicio>();
            services.AddScoped<IContactanosServicio, ContactanosServicio>();
            services.AddScoped<IRazonServicio, RazonesServicio>();
            services.AddScoped<IRegistroServicio, RegistroServicio>();
            services.AddScoped<IEstadosServicio, EstadosServicio>();
        }
    }
}
