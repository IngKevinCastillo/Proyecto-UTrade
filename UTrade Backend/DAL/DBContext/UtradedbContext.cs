using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Model;

namespace DAL;

public partial class UtradedbContext : DbContext
{
    public UtradedbContext()
    {
    }

    public UtradedbContext(DbContextOptions<UtradedbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ArchivosAdjuntos> ArchivosAdjuntos { get; set; }

    public virtual DbSet<CategoriaPublicacion> CategoriaPublicacions { get; set; }

    public virtual DbSet<Chat> Chats { get; set; }

    public virtual DbSet<CodigosVerificacion> CodigosVerificacions { get; set; }

    public virtual DbSet<Contactanos> Contactanos { get; set; }

    public virtual DbSet<Estados> Estados { get; set; }

    public virtual DbSet<EstadosReporte> EstadosReportes { get; set; }

    public virtual DbSet<Favoritos> Favoritos { get; set; }

    public virtual DbSet<FotosPublicaciones> FotosPublicaciones { get; set; }

    public virtual DbSet<Likes> Likes { get; set; }

    public virtual DbSet<Mensajes> Mensajes { get; set; }

    public virtual DbSet<MensajeAccion> MensajeAccions { get; set; }

    public virtual DbSet<MotivosReporte> MotivosReportes { get; set; }

    public virtual DbSet<Notificaciones> Notificaciones { get; set; }

    public virtual DbSet<Persona> Personas { get; set; }

    public virtual DbSet<Publicaciones> Publicaciones { get; set; }

    public virtual DbSet<Razones> Razones { get; set; }

    public virtual DbSet<Reportes> Reportes { get; set; }

    public virtual DbSet<Reseña> Reseñas { get; set; }

    public virtual DbSet<Rol> Rols { get; set; }

    public virtual DbSet<TipoAccion> TipoAccions { get; set; }

    public virtual DbSet<TiposReporte> TiposReportes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ArchivosAdjuntos>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Archivos__3213E83FA912E865");

            entity.Property(e => e.Id)
                .HasMaxLength(50)
                .HasColumnName("id");
            entity.Property(e => e.Archivo).HasColumnName("archivo");
            entity.Property(e => e.IdMensaje)
                .HasMaxLength(50)
                .HasColumnName("idMensaje");

            entity.HasOne(d => d.IdMensajeNavigation).WithMany(p => p.ArchivosAdjuntos)
                .HasForeignKey(d => d.IdMensaje)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ArchivosAdjuntos_Mensaje");
        });

        modelBuilder.Entity<CategoriaPublicacion>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Categori__3213E83FFF951DD9");

            entity.ToTable("CategoriaPublicacion");

            entity.Property(e => e.Id)
                .HasMaxLength(50)
                .HasColumnName("id");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<Chat>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Chat__3213E83FF9773D92");

            entity.ToTable("Chat");

            entity.Property(e => e.Id)
                .HasMaxLength(50)
                .HasColumnName("id");
            entity.Property(e => e.FechaCreacion)
                .HasColumnType("datetime")
                .HasColumnName("fecha_creacion");
            entity.Property(e => e.Usuario1Id)
                .HasMaxLength(50)
                .HasColumnName("usuario1_id");
            entity.Property(e => e.Usuario2Id)
                .HasMaxLength(50)
                .HasColumnName("usuario2_id");

            entity.HasOne(d => d.Usuario1).WithMany(p => p.ChatUsuario1s)
                .HasForeignKey(d => d.Usuario1Id)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Chat_Usuario1");

            entity.HasOne(d => d.Usuario2).WithMany(p => p.ChatUsuario2s)
                .HasForeignKey(d => d.Usuario2Id)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Chat_Usuario2");
        });

        modelBuilder.Entity<CodigosVerificacion>(entity =>
        {
            entity.ToTable("CodigosVerificacion");

            entity.Property(e => e.Id)
                .HasMaxLength(30)
                .HasColumnName("id");
            entity.Property(e => e.Codigo)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("codigo");
            entity.Property(e => e.Hora)
                .HasPrecision(0)
                .HasColumnName("hora");
        });

        modelBuilder.Entity<Contactanos>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Contacta__3213E83FC99B374F");

            entity.Property(e => e.Id)
                .HasMaxLength(50)
                .HasColumnName("id");
            entity.Property(e => e.Descripcion)
                .HasColumnType("text")
                .HasColumnName("descripcion");
            entity.Property(e => e.IdPersona)
                .HasMaxLength(50)
                .HasColumnName("idPersona");
            entity.Property(e => e.IdRazon)
                .HasMaxLength(50)
                .HasColumnName("idRazon");

            entity.HasOne(d => d.IdPersonaNavigation).WithMany(p => p.Contactanos)
                .HasForeignKey(d => d.IdPersona)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Contactanos_Persona");

            entity.HasOne(d => d.IdRazonNavigation).WithMany(p => p.Contactanos)
                .HasForeignKey(d => d.IdRazon)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Contactanos_Razon");
        });

        modelBuilder.Entity<Estados>(entity =>
        {
            entity.Property(e => e.Id)
                .HasMaxLength(50)
                .HasColumnName("id");
            entity.Property(e => e.Nombre)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<EstadosReporte>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__EstadosR__3213E83F5E6094F5");

            entity.ToTable("EstadosReporte");

            entity.Property(e => e.Id)
                .HasMaxLength(50)
                .HasColumnName("id");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<Favoritos>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Favorito__3213E83F8248A53C");

            entity.HasIndex(e => new { e.IdPersona, e.IdPublicacion }, "UQ_Favorito").IsUnique();

            entity.Property(e => e.Id)
                .HasMaxLength(50)
                .HasColumnName("id");
            entity.Property(e => e.IdPersona)
                .HasMaxLength(50)
                .HasColumnName("idPersona");
            entity.Property(e => e.IdPublicacion)
                .HasMaxLength(50)
                .HasColumnName("idPublicacion");

            entity.HasOne(d => d.IdPersonaNavigation).WithMany(p => p.Favoritos)
                .HasForeignKey(d => d.IdPersona)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Favoritos_Persona");

            entity.HasOne(d => d.IdPublicacionNavigation).WithMany(p => p.Favoritos)
                .HasForeignKey(d => d.IdPublicacion)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Favoritos_Publicacion");
        });

        modelBuilder.Entity<FotosPublicaciones>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__FotosPub__3213E83FDDC6E049");

            entity.Property(e => e.Id)
                .HasMaxLength(50)
                .HasColumnName("id");
            entity.Property(e => e.Foto).HasColumnName("foto");
            entity.Property(e => e.IdPublicacion)
                .HasMaxLength(50)
                .HasColumnName("idPublicacion");

            entity.HasOne(d => d.IdPublicacionNavigation).WithMany(p => p.FotosPublicaciones)
                .HasForeignKey(d => d.IdPublicacion)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FotosPublicaciones_Publicacion");
        });

        modelBuilder.Entity<Likes>(entity =>
        {
            entity.Property(e => e.Id)
                .HasMaxLength(50)
                .HasColumnName("id");
            entity.Property(e => e.IdPersona)
                .HasMaxLength(50)
                .HasColumnName("idPersona");
            entity.Property(e => e.IdReseña)
                .HasMaxLength(50)
                .HasColumnName("idReseña");

            entity.HasOne(d => d.IdPersonaNavigation).WithMany(p => p.Likes)
                .HasForeignKey(d => d.IdPersona)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Likes_Persona");

            entity.HasOne(d => d.IdReseñaNavigation).WithMany(p => p.Likes)
                .HasForeignKey(d => d.IdReseña)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Likes_Reseña");
        });

        modelBuilder.Entity<Mensajes>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Mensajes__3213E83FE1CBE6D9");

            entity.Property(e => e.Id)
                .HasMaxLength(50)
                .HasColumnName("id");
            entity.Property(e => e.AutorId)
                .HasMaxLength(50)
                .HasColumnName("autor_id");
            entity.Property(e => e.ChatId)
                .HasMaxLength(50)
                .HasColumnName("chat_id");
            entity.Property(e => e.Hora)
                .HasColumnType("datetime")
                .HasColumnName("hora");
            entity.Property(e => e.Mensaje1)
                .HasColumnType("text")
                .HasColumnName("mensaje");

            entity.HasOne(d => d.Autor).WithMany(p => p.Mensajes)
                .HasForeignKey(d => d.AutorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Mensajes_Autor");

            entity.HasOne(d => d.Chat).WithMany(p => p.Mensajes)
                .HasForeignKey(d => d.ChatId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Mensajes_Chat");
        });

        modelBuilder.Entity<MensajeAccion>(entity =>
        {
            entity.ToTable("MensajeAccion");

            entity.Property(e => e.Id)
                .HasMaxLength(50)
                .HasColumnName("id");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("descripcion");
        });

        modelBuilder.Entity<MotivosReporte>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__MotivosR__3213E83F0FB53685");

            entity.ToTable("MotivosReporte");

            entity.Property(e => e.Id)
                .HasMaxLength(50)
                .HasColumnName("id");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<Notificaciones>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Notifica__3213E83FA2062545");

            entity.Property(e => e.Id)
                .HasMaxLength(50)
                .HasColumnName("id");
            entity.Property(e => e.Estado).HasColumnName("estado");
            entity.Property(e => e.Fecha).HasColumnName("fecha");
            entity.Property(e => e.Hora).HasColumnName("hora");
            entity.Property(e => e.IdPersona)
                .HasMaxLength(50)
                .HasColumnName("idPersona");
            entity.Property(e => e.IdTipoAccion)
                .HasMaxLength(50)
                .HasColumnName("idTipoAccion");

            entity.HasOne(d => d.IdPersonaNavigation).WithMany(p => p.Notificaciones)
                .HasForeignKey(d => d.IdPersona)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Notificaciones_Persona");

            entity.HasOne(d => d.IdTipoAccionNavigation).WithMany(p => p.Notificaciones)
                .HasForeignKey(d => d.IdTipoAccion)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Notificaciones_TipoAccion");
        });

        modelBuilder.Entity<Persona>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Persona__3213E83F2D3FFCCF");

            entity.ToTable("Persona");

            entity.HasIndex(e => e.Correo, "UQ__Persona__2A586E0BD226D6D6").IsUnique();

            entity.HasIndex(e => e.NombreUsuario, "UQ__Persona__A0436BD7EC496AF6").IsUnique();

            entity.Property(e => e.Id)
                .HasMaxLength(50)
                .HasColumnName("id");
            entity.Property(e => e.Apellidos)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("apellidos");
            entity.Property(e => e.Contraseña)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("contraseña");
            entity.Property(e => e.Correo)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("correo");
            entity.Property(e => e.FechaNacimiento).HasColumnName("fechaNacimiento");
            entity.Property(e => e.FotoPerfil).HasColumnName("fotoPerfil");
            entity.Property(e => e.Genero)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("genero");
            entity.Property(e => e.IdEstado)
                .HasMaxLength(50)
                .HasColumnName("idEstado");
            entity.Property(e => e.IdRol)
                .HasMaxLength(50)
                .HasColumnName("idRol");
            entity.Property(e => e.NombreUsuario)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nombreUsuario");
            entity.Property(e => e.Nombres)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nombres");
            entity.Property(e => e.Telefono)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("telefono");

            entity.HasOne(d => d.IdEstadoNavigation).WithMany(p => p.Personas)
                .HasForeignKey(d => d.IdEstado)
                .HasConstraintName("FK_Persona_Estados");

            entity.HasOne(d => d.IdRolNavigation).WithMany(p => p.Personas)
                .HasForeignKey(d => d.IdRol)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Persona_Rol");
        });

        modelBuilder.Entity<Publicaciones>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Publicac__3213E83F0CEDC760");

            entity.Property(e => e.Id)
                .HasMaxLength(50)
                .HasColumnName("id");
            entity.Property(e => e.Altitud)
                .HasColumnType("decimal(20, 10)")
                .HasColumnName("altitud");
            entity.Property(e => e.Descripcion)
                .HasColumnType("text")
                .HasColumnName("descripcion");
            entity.Property(e => e.Direccion)
                .HasMaxLength(100)
                .IsFixedLength()
                .HasColumnName("direccion");
            entity.Property(e => e.FechaPublicacion)
                .HasColumnType("datetime")
                .HasColumnName("fechaPublicacion");
            entity.Property(e => e.IdCategoria)
                .HasMaxLength(50)
                .HasColumnName("idCategoria");
            entity.Property(e => e.IdEstado)
                .HasMaxLength(50)
                .HasColumnName("idEstado");
            entity.Property(e => e.IdUsuario)
                .HasMaxLength(50)
                .HasColumnName("idUsuario");
            entity.Property(e => e.Latitud)
                .HasColumnType("decimal(20, 10)")
                .HasColumnName("latitud");
            entity.Property(e => e.Precio)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("precio");
            entity.Property(e => e.Titulo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("titulo");

            entity.HasOne(d => d.IdCategoriaNavigation).WithMany(p => p.Publicaciones)
                .HasForeignKey(d => d.IdCategoria)
                .HasConstraintName("FK_Publicaciones_Categoria");

            entity.HasOne(d => d.IdEstadoNavigation).WithMany(p => p.Publicaciones)
                .HasForeignKey(d => d.IdEstado)
                .HasConstraintName("FK_Publicaciones_Estados");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Publicaciones)
                .HasForeignKey(d => d.IdUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Publicaciones_Persona");
        });

        modelBuilder.Entity<Razones>(entity =>
        {
            entity.HasKey(e => e.IdRazon).HasName("PK__Razones__690E732972E373B2");

            entity.Property(e => e.IdRazon)
                .HasMaxLength(50)
                .HasColumnName("idRazon");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<Reportes>(entity =>
        {
            entity.HasKey(e => e.IdReporte).HasName("PK__Reportes__40D65D3CDE953B4E");

            entity.Property(e => e.IdReporte)
                .HasMaxLength(50)
                .HasColumnName("idReporte");
            entity.Property(e => e.Descripcion)
                .HasColumnType("text")
                .HasColumnName("descripcion");
            entity.Property(e => e.FechaActualizacion)
                .HasColumnType("datetime")
                .HasColumnName("fechaActualizacion");
            entity.Property(e => e.FechaReportada)
                .HasColumnType("datetime")
                .HasColumnName("fechaReportada");
            entity.Property(e => e.IdEstado)
                .HasMaxLength(50)
                .HasColumnName("idEstado");
            entity.Property(e => e.IdMotivo)
                .HasMaxLength(50)
                .HasColumnName("idMotivo");
            entity.Property(e => e.IdReportado)
                .HasMaxLength(50)
                .HasColumnName("idReportado");
            entity.Property(e => e.IdReportante)
                .HasMaxLength(50)
                .HasColumnName("idReportante");
            entity.Property(e => e.IdTipoReporte)
                .HasMaxLength(50)
                .HasColumnName("idTipoReporte");
            entity.Property(e => e.Leido).HasColumnName("leido");

            entity.HasOne(d => d.IdEstadoNavigation).WithMany(p => p.Reportes)
                .HasForeignKey(d => d.IdEstado)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Reportes_Estado");

            entity.HasOne(d => d.IdMotivoNavigation).WithMany(p => p.Reportes)
                .HasForeignKey(d => d.IdMotivo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Reportes_Motivo");

            entity.HasOne(d => d.IdReportanteNavigation).WithMany(p => p.Reportes)
                .HasForeignKey(d => d.IdReportante)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Reportes_Reportante");

            entity.HasOne(d => d.IdTipoReporteNavigation).WithMany(p => p.Reportes)
                .HasForeignKey(d => d.IdTipoReporte)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Reportes_TipoReporte");
        });

        modelBuilder.Entity<Reseña>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Reseña__3213E83F5DEE2FDC");

            entity.ToTable("Reseña");

            entity.Property(e => e.Id)
                .HasMaxLength(50)
                .HasColumnName("id");
            entity.Property(e => e.Calificacion).HasColumnName("calificacion");
            entity.Property(e => e.Comentario)
                .HasColumnType("text")
                .HasColumnName("comentario");
            entity.Property(e => e.Fecha)
                .HasColumnType("datetime")
                .HasColumnName("fecha");
            entity.Property(e => e.IdPersona)
                .HasMaxLength(50)
                .HasColumnName("idPersona");
            entity.Property(e => e.IdPublicacion)
                .HasMaxLength(50)
                .HasColumnName("idPublicacion");
            entity.Property(e => e.Verificado).HasColumnName("verificado");

            entity.HasOne(d => d.IdPersonaNavigation).WithMany(p => p.Reseñas)
                .HasForeignKey(d => d.IdPersona)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Reseña_Persona");

            entity.HasOne(d => d.IdPublicacionNavigation).WithMany(p => p.Reseñas)
                .HasForeignKey(d => d.IdPublicacion)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Reseña_Publicacion");
        });

        modelBuilder.Entity<Rol>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Rol__3213E83F6CC5C320");

            entity.ToTable("Rol");

            entity.Property(e => e.Id)
                .HasMaxLength(50)
                .HasColumnName("id");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<TipoAccion>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__TipoAcci__3213E83FD77C81D5");

            entity.ToTable("TipoAccion");

            entity.Property(e => e.Id)
                .HasMaxLength(50)
                .HasColumnName("id");
            entity.Property(e => e.IdPersonaRemitente)
                .HasMaxLength(50)
                .HasColumnName("idPersonaRemitente");
            entity.Property(e => e.IdPersonaReportada)
                .HasMaxLength(50)
                .HasColumnName("idPersonaReportada");
            entity.Property(e => e.IdTipoMensaje)
                .HasMaxLength(50)
                .HasColumnName("idTipoMensaje");
            entity.Property(e => e.TipoId)
                .HasMaxLength(50)
                .HasColumnName("tipoId");

            entity.HasOne(d => d.IdPersonaRemitenteNavigation).WithMany(p => p.TipoAccionIdPersonaRemitenteNavigations)
                .HasForeignKey(d => d.IdPersonaRemitente)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TipoAccion_Persona");

            entity.HasOne(d => d.IdPersonaReportadaNavigation).WithMany(p => p.TipoAccionIdPersonaReportadaNavigations)
                .HasForeignKey(d => d.IdPersonaReportada)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TipoAccion_Persona1");

            entity.HasOne(d => d.IdTipoMensajeNavigation).WithMany(p => p.TipoAccions)
                .HasForeignKey(d => d.IdTipoMensaje)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TipoAccion_MensajeAccion");
        });

        modelBuilder.Entity<TiposReporte>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__TiposRep__3213E83F788E710C");

            entity.ToTable("TiposReporte");

            entity.Property(e => e.Id)
                .HasMaxLength(50)
                .HasColumnName("id");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nombre");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
