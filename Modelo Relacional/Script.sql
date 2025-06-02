USE [master]
GO
/****** Object:  Database [UTradeDB]    Script Date: 2/06/2025 12:33:11 p. m. ******/
CREATE DATABASE [UTradeDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'UTradeDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\UTradeDB.mdf' , SIZE = 73728KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'UTradeDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\UTradeDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [UTradeDB] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [UTradeDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [UTradeDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [UTradeDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [UTradeDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [UTradeDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [UTradeDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [UTradeDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [UTradeDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [UTradeDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [UTradeDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [UTradeDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [UTradeDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [UTradeDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [UTradeDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [UTradeDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [UTradeDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [UTradeDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [UTradeDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [UTradeDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [UTradeDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [UTradeDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [UTradeDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [UTradeDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [UTradeDB] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [UTradeDB] SET  MULTI_USER 
GO
ALTER DATABASE [UTradeDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [UTradeDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [UTradeDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [UTradeDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [UTradeDB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [UTradeDB] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [UTradeDB] SET QUERY_STORE = ON
GO
ALTER DATABASE [UTradeDB] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [UTradeDB]
GO
/****** Object:  Table [dbo].[ArchivosAdjuntos]    Script Date: 2/06/2025 12:33:11 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ArchivosAdjuntos](
	[id] [nvarchar](50) NOT NULL,
	[archivo] [varbinary](max) NOT NULL,
	[idMensaje] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK__Archivos__3213E83FD9D86CC0] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CategoriaPublicacion]    Script Date: 2/06/2025 12:33:11 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CategoriaPublicacion](
	[id] [nvarchar](50) NOT NULL,
	[nombre] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Chat]    Script Date: 2/06/2025 12:33:11 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Chat](
	[id] [nvarchar](50) NOT NULL,
	[usuario1_id] [nvarchar](50) NOT NULL,
	[usuario2_id] [nvarchar](50) NOT NULL,
	[fecha_creacion] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CodigosVerificacion]    Script Date: 2/06/2025 12:33:11 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CodigosVerificacion](
	[id] [nvarchar](30) NOT NULL,
	[codigo] [varchar](50) NOT NULL,
	[hora] [time](0) NOT NULL,
 CONSTRAINT [PK_CodigosVerificacion] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Contactanos]    Script Date: 2/06/2025 12:33:11 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Contactanos](
	[id] [nvarchar](50) NOT NULL,
	[idPersona] [nvarchar](50) NOT NULL,
	[idRazon] [nvarchar](50) NOT NULL,
	[descripcion] [text] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Estados]    Script Date: 2/06/2025 12:33:11 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Estados](
	[id] [nvarchar](50) NOT NULL,
	[nombre] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Estados] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EstadosReporte]    Script Date: 2/06/2025 12:33:11 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EstadosReporte](
	[id] [nvarchar](50) NOT NULL,
	[nombre] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Favoritos]    Script Date: 2/06/2025 12:33:11 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Favoritos](
	[id] [nvarchar](50) NOT NULL,
	[idPersona] [nvarchar](50) NOT NULL,
	[idPublicacion] [nvarchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_Favorito] UNIQUE NONCLUSTERED 
(
	[idPersona] ASC,
	[idPublicacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FotosPublicaciones]    Script Date: 2/06/2025 12:33:11 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FotosPublicaciones](
	[id] [nvarchar](50) NOT NULL,
	[foto] [varbinary](max) NOT NULL,
	[idPublicacion] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK__FotosPub__3213E83FF6622F9F] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Likes]    Script Date: 2/06/2025 12:33:11 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Likes](
	[id] [nvarchar](50) NOT NULL,
	[idReseña] [nvarchar](50) NOT NULL,
	[idPersona] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Likes] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MensajeAccion]    Script Date: 2/06/2025 12:33:11 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MensajeAccion](
	[id] [nvarchar](50) NOT NULL,
	[descripcion] [varchar](100) NOT NULL,
 CONSTRAINT [PK_MensajeAccion] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Mensajes]    Script Date: 2/06/2025 12:33:11 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Mensajes](
	[id] [nvarchar](50) NOT NULL,
	[chat_id] [nvarchar](50) NOT NULL,
	[autor_id] [nvarchar](50) NOT NULL,
	[mensaje] [text] NOT NULL,
	[hora] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MotivosReporte]    Script Date: 2/06/2025 12:33:11 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MotivosReporte](
	[id] [nvarchar](50) NOT NULL,
	[nombre] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Notificaciones]    Script Date: 2/06/2025 12:33:11 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Notificaciones](
	[id] [nvarchar](50) NOT NULL,
	[idPersona] [nvarchar](50) NOT NULL,
	[idTipoAccion] [nvarchar](50) NOT NULL,
	[fecha] [date] NOT NULL,
	[hora] [time](7) NOT NULL,
	[estado] [bit] NOT NULL,
 CONSTRAINT [PK__Notifica__3213E83F2B21A8AB] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Persona]    Script Date: 2/06/2025 12:33:11 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Persona](
	[id] [nvarchar](50) NOT NULL,
	[nombres] [varchar](100) NOT NULL,
	[apellidos] [varchar](100) NOT NULL,
	[fechaNacimiento] [date] NULL,
	[genero] [char](1) NULL,
	[idRol] [nvarchar](50) NOT NULL,
	[nombreUsuario] [varchar](50) NOT NULL,
	[contraseña] [varchar](255) NOT NULL,
	[correo] [varchar](100) NULL,
	[telefono] [varchar](20) NULL,
	[fotoPerfil] [varbinary](max) NULL,
	[idEstado] [nvarchar](50) NULL,
 CONSTRAINT [PK__Persona__3213E83F52CBE6C9] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ__Persona__2A586E0B05BB633A] UNIQUE NONCLUSTERED 
(
	[correo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ__Persona__A0436BD7FE5E6E74] UNIQUE NONCLUSTERED 
(
	[nombreUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Publicaciones]    Script Date: 2/06/2025 12:33:11 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Publicaciones](
	[id] [nvarchar](50) NOT NULL,
	[titulo] [varchar](255) NOT NULL,
	[fechaPublicacion] [datetime] NOT NULL,
	[idUsuario] [nvarchar](50) NOT NULL,
	[precio] [decimal](10, 2) NULL,
	[idCategoria] [nvarchar](50) NULL,
	[descripcion] [text] NOT NULL,
	[idEstado] [nvarchar](50) NULL,
	[direccion] [nchar](100) NULL,
	[altitud] [decimal](20, 10) NULL,
	[latitud] [decimal](20, 10) NULL,
 CONSTRAINT [PK__Publicac__3213E83F9BA5B02D] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Razones]    Script Date: 2/06/2025 12:33:11 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Razones](
	[idRazon] [nvarchar](50) NOT NULL,
	[nombre] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idRazon] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Reportes]    Script Date: 2/06/2025 12:33:11 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reportes](
	[idReporte] [nvarchar](50) NOT NULL,
	[idTipoReporte] [nvarchar](50) NOT NULL,
	[idEstado] [nvarchar](50) NOT NULL,
	[fechaReportada] [datetime] NOT NULL,
	[fechaActualizacion] [datetime] NULL,
	[leido] [bit] NOT NULL,
	[idReportante] [nvarchar](50) NOT NULL,
	[idReportado] [nvarchar](50) NOT NULL,
	[idMotivo] [nvarchar](50) NOT NULL,
	[descripcion] [text] NULL,
PRIMARY KEY CLUSTERED 
(
	[idReporte] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Reseña]    Script Date: 2/06/2025 12:33:11 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reseña](
	[id] [nvarchar](50) NOT NULL,
	[calificacion] [int] NOT NULL,
	[comentario] [text] NULL,
	[idPublicacion] [nvarchar](50) NOT NULL,
	[idPersona] [nvarchar](50) NOT NULL,
	[fecha] [datetime] NOT NULL,
	[verificado] [bit] NOT NULL,
 CONSTRAINT [PK__Reseña__3213E83F8C67CE25] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Rol]    Script Date: 2/06/2025 12:33:11 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Rol](
	[id] [nvarchar](50) NOT NULL,
	[nombre] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TipoAccion]    Script Date: 2/06/2025 12:33:11 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TipoAccion](
	[id] [nvarchar](50) NOT NULL,
	[idTipoMensaje] [nvarchar](50) NOT NULL,
	[idPersonaRemitente] [nvarchar](50) NOT NULL,
	[idPersonaReportada] [nvarchar](50) NOT NULL,
	[tipoId] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK__TipoAcci__3213E83F3A005BA2] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TiposReporte]    Script Date: 2/06/2025 12:33:11 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TiposReporte](
	[id] [nvarchar](50) NOT NULL,
	[nombre] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Reportes] ADD  DEFAULT ((0)) FOR [leido]
GO
ALTER TABLE [dbo].[ArchivosAdjuntos]  WITH CHECK ADD  CONSTRAINT [FK_ArchivosAdjuntos_Mensaje] FOREIGN KEY([idMensaje])
REFERENCES [dbo].[Mensajes] ([id])
GO
ALTER TABLE [dbo].[ArchivosAdjuntos] CHECK CONSTRAINT [FK_ArchivosAdjuntos_Mensaje]
GO
ALTER TABLE [dbo].[Chat]  WITH CHECK ADD  CONSTRAINT [FK_Chat_Usuario1] FOREIGN KEY([usuario1_id])
REFERENCES [dbo].[Persona] ([id])
GO
ALTER TABLE [dbo].[Chat] CHECK CONSTRAINT [FK_Chat_Usuario1]
GO
ALTER TABLE [dbo].[Chat]  WITH CHECK ADD  CONSTRAINT [FK_Chat_Usuario2] FOREIGN KEY([usuario2_id])
REFERENCES [dbo].[Persona] ([id])
GO
ALTER TABLE [dbo].[Chat] CHECK CONSTRAINT [FK_Chat_Usuario2]
GO
ALTER TABLE [dbo].[Contactanos]  WITH CHECK ADD  CONSTRAINT [FK_Contactanos_Persona] FOREIGN KEY([idPersona])
REFERENCES [dbo].[Persona] ([id])
GO
ALTER TABLE [dbo].[Contactanos] CHECK CONSTRAINT [FK_Contactanos_Persona]
GO
ALTER TABLE [dbo].[Contactanos]  WITH CHECK ADD  CONSTRAINT [FK_Contactanos_Razon] FOREIGN KEY([idRazon])
REFERENCES [dbo].[Razones] ([idRazon])
GO
ALTER TABLE [dbo].[Contactanos] CHECK CONSTRAINT [FK_Contactanos_Razon]
GO
ALTER TABLE [dbo].[Favoritos]  WITH CHECK ADD  CONSTRAINT [FK_Favoritos_Persona] FOREIGN KEY([idPersona])
REFERENCES [dbo].[Persona] ([id])
GO
ALTER TABLE [dbo].[Favoritos] CHECK CONSTRAINT [FK_Favoritos_Persona]
GO
ALTER TABLE [dbo].[Favoritos]  WITH CHECK ADD  CONSTRAINT [FK_Favoritos_Publicacion] FOREIGN KEY([idPublicacion])
REFERENCES [dbo].[Publicaciones] ([id])
GO
ALTER TABLE [dbo].[Favoritos] CHECK CONSTRAINT [FK_Favoritos_Publicacion]
GO
ALTER TABLE [dbo].[FotosPublicaciones]  WITH CHECK ADD  CONSTRAINT [FK_FotosPublicaciones_Publicacion] FOREIGN KEY([idPublicacion])
REFERENCES [dbo].[Publicaciones] ([id])
GO
ALTER TABLE [dbo].[FotosPublicaciones] CHECK CONSTRAINT [FK_FotosPublicaciones_Publicacion]
GO
ALTER TABLE [dbo].[Likes]  WITH CHECK ADD  CONSTRAINT [FK_Likes_Persona] FOREIGN KEY([idPersona])
REFERENCES [dbo].[Persona] ([id])
GO
ALTER TABLE [dbo].[Likes] CHECK CONSTRAINT [FK_Likes_Persona]
GO
ALTER TABLE [dbo].[Likes]  WITH CHECK ADD  CONSTRAINT [FK_Likes_Reseña] FOREIGN KEY([idReseña])
REFERENCES [dbo].[Reseña] ([id])
GO
ALTER TABLE [dbo].[Likes] CHECK CONSTRAINT [FK_Likes_Reseña]
GO
ALTER TABLE [dbo].[Mensajes]  WITH CHECK ADD  CONSTRAINT [FK_Mensajes_Autor] FOREIGN KEY([autor_id])
REFERENCES [dbo].[Persona] ([id])
GO
ALTER TABLE [dbo].[Mensajes] CHECK CONSTRAINT [FK_Mensajes_Autor]
GO
ALTER TABLE [dbo].[Mensajes]  WITH CHECK ADD  CONSTRAINT [FK_Mensajes_Chat] FOREIGN KEY([chat_id])
REFERENCES [dbo].[Chat] ([id])
GO
ALTER TABLE [dbo].[Mensajes] CHECK CONSTRAINT [FK_Mensajes_Chat]
GO
ALTER TABLE [dbo].[Notificaciones]  WITH CHECK ADD  CONSTRAINT [FK_Notificaciones_Persona] FOREIGN KEY([idPersona])
REFERENCES [dbo].[Persona] ([id])
GO
ALTER TABLE [dbo].[Notificaciones] CHECK CONSTRAINT [FK_Notificaciones_Persona]
GO
ALTER TABLE [dbo].[Notificaciones]  WITH CHECK ADD  CONSTRAINT [FK_Notificaciones_TipoAccion] FOREIGN KEY([idTipoAccion])
REFERENCES [dbo].[TipoAccion] ([id])
GO
ALTER TABLE [dbo].[Notificaciones] CHECK CONSTRAINT [FK_Notificaciones_TipoAccion]
GO
ALTER TABLE [dbo].[Persona]  WITH CHECK ADD  CONSTRAINT [FK_Persona_Estados] FOREIGN KEY([idEstado])
REFERENCES [dbo].[Estados] ([id])
GO
ALTER TABLE [dbo].[Persona] CHECK CONSTRAINT [FK_Persona_Estados]
GO
ALTER TABLE [dbo].[Persona]  WITH CHECK ADD  CONSTRAINT [FK_Persona_Rol] FOREIGN KEY([idRol])
REFERENCES [dbo].[Rol] ([id])
GO
ALTER TABLE [dbo].[Persona] CHECK CONSTRAINT [FK_Persona_Rol]
GO
ALTER TABLE [dbo].[Publicaciones]  WITH CHECK ADD  CONSTRAINT [FK_Publicaciones_Categoria] FOREIGN KEY([idCategoria])
REFERENCES [dbo].[CategoriaPublicacion] ([id])
GO
ALTER TABLE [dbo].[Publicaciones] CHECK CONSTRAINT [FK_Publicaciones_Categoria]
GO
ALTER TABLE [dbo].[Publicaciones]  WITH CHECK ADD  CONSTRAINT [FK_Publicaciones_Estados] FOREIGN KEY([idEstado])
REFERENCES [dbo].[Estados] ([id])
GO
ALTER TABLE [dbo].[Publicaciones] CHECK CONSTRAINT [FK_Publicaciones_Estados]
GO
ALTER TABLE [dbo].[Publicaciones]  WITH CHECK ADD  CONSTRAINT [FK_Publicaciones_Persona] FOREIGN KEY([idUsuario])
REFERENCES [dbo].[Persona] ([id])
GO
ALTER TABLE [dbo].[Publicaciones] CHECK CONSTRAINT [FK_Publicaciones_Persona]
GO
ALTER TABLE [dbo].[Reportes]  WITH CHECK ADD  CONSTRAINT [FK_Reportes_Estado] FOREIGN KEY([idEstado])
REFERENCES [dbo].[EstadosReporte] ([id])
GO
ALTER TABLE [dbo].[Reportes] CHECK CONSTRAINT [FK_Reportes_Estado]
GO
ALTER TABLE [dbo].[Reportes]  WITH CHECK ADD  CONSTRAINT [FK_Reportes_Motivo] FOREIGN KEY([idMotivo])
REFERENCES [dbo].[MotivosReporte] ([id])
GO
ALTER TABLE [dbo].[Reportes] CHECK CONSTRAINT [FK_Reportes_Motivo]
GO
ALTER TABLE [dbo].[Reportes]  WITH CHECK ADD  CONSTRAINT [FK_Reportes_Reportante] FOREIGN KEY([idReportante])
REFERENCES [dbo].[Persona] ([id])
GO
ALTER TABLE [dbo].[Reportes] CHECK CONSTRAINT [FK_Reportes_Reportante]
GO
ALTER TABLE [dbo].[Reportes]  WITH CHECK ADD  CONSTRAINT [FK_Reportes_TipoReporte] FOREIGN KEY([idTipoReporte])
REFERENCES [dbo].[TiposReporte] ([id])
GO
ALTER TABLE [dbo].[Reportes] CHECK CONSTRAINT [FK_Reportes_TipoReporte]
GO
ALTER TABLE [dbo].[Reseña]  WITH CHECK ADD  CONSTRAINT [FK_Reseña_Persona] FOREIGN KEY([idPersona])
REFERENCES [dbo].[Persona] ([id])
GO
ALTER TABLE [dbo].[Reseña] CHECK CONSTRAINT [FK_Reseña_Persona]
GO
ALTER TABLE [dbo].[Reseña]  WITH CHECK ADD  CONSTRAINT [FK_Reseña_Publicacion] FOREIGN KEY([idPublicacion])
REFERENCES [dbo].[Publicaciones] ([id])
GO
ALTER TABLE [dbo].[Reseña] CHECK CONSTRAINT [FK_Reseña_Publicacion]
GO
ALTER TABLE [dbo].[TipoAccion]  WITH CHECK ADD  CONSTRAINT [FK_TipoAccion_MensajeAccion] FOREIGN KEY([idTipoMensaje])
REFERENCES [dbo].[MensajeAccion] ([id])
GO
ALTER TABLE [dbo].[TipoAccion] CHECK CONSTRAINT [FK_TipoAccion_MensajeAccion]
GO
ALTER TABLE [dbo].[TipoAccion]  WITH CHECK ADD  CONSTRAINT [FK_TipoAccion_Persona] FOREIGN KEY([idPersonaRemitente])
REFERENCES [dbo].[Persona] ([id])
GO
ALTER TABLE [dbo].[TipoAccion] CHECK CONSTRAINT [FK_TipoAccion_Persona]
GO
ALTER TABLE [dbo].[TipoAccion]  WITH CHECK ADD  CONSTRAINT [FK_TipoAccion_Persona1] FOREIGN KEY([idPersonaReportada])
REFERENCES [dbo].[Persona] ([id])
GO
ALTER TABLE [dbo].[TipoAccion] CHECK CONSTRAINT [FK_TipoAccion_Persona1]
GO
USE [master]
GO
ALTER DATABASE [UTradeDB] SET  READ_WRITE 
GO
