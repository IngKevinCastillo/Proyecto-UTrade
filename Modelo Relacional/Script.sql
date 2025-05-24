CREATE DATABASE UTradeDB;
GO

USE UTradeDB;
GO


-- Script SQL para creaci�n de tablas basado en el diagrama
-- Cada primer atributo es considerado como llave primaria
-- Las relaciones for�neas est�n basadas en el diagrama proporcionado

-- Creaci�n de tabla Rol
CREATE TABLE Rol (
    id NVARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);
GO

-- Creaci�n de tabla TipoAccion
CREATE TABLE TipoAccion (
    id NVARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255)
);
GO

-- Creaci�n de tabla TiposReporte
CREATE TABLE TiposReporte (
    id NVARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);
GO

-- Creaci�n de tabla EstadosReporte
CREATE TABLE EstadosReporte (
    id NVARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);
GO

-- Creaci�n de tabla MotivosReporte
CREATE TABLE MotivosReporte (
    id NVARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);
GO

-- Creaci�n de tabla Razones
CREATE TABLE Razones (
    idRazon NVARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);
GO

-- Creaci�n de tabla CategoriaPublicacion
CREATE TABLE CategoriaPublicacion (
    id NVARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);
GO
-- Creaci�n de tabla Persona
CREATE TABLE Persona (
    id NVARCHAR(50) PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    fechaNacimiento DATE,
    genero CHAR(1),
    idRol NVARCHAR(50) NOT NULL,
    nombreUsuario VARCHAR(50) UNIQUE NOT NULL,
    contrase�a VARCHAR(255) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    fotoPerfil VARCHAR(255),
    CONSTRAINT FK_Persona_Rol FOREIGN KEY (idRol) REFERENCES Rol(id)
);
GO

-- Creaci�n de tabla Publicaciones
CREATE TABLE Publicaciones (
    id NVARCHAR(50) PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    fechaPublicacion DATETIME NOT NULL,
    idUsuario NVARCHAR(50) NOT NULL,
    precio DECIMAL(10,2),
    idCategoria NVARCHAR(50),
    descripcion TEXT,
    ubicacion VARCHAR(255),
    idRese�a NVARCHAR(50) NULL,
    CONSTRAINT FK_Publicaciones_Persona FOREIGN KEY (idUsuario) REFERENCES Persona(id),
    CONSTRAINT FK_Publicaciones_Categoria FOREIGN KEY (idCategoria) REFERENCES CategoriaPublicacion(id)
);
GO
-- Creaci�n de tabla Favoritos
CREATE TABLE Favoritos (
    id NVARCHAR(50) PRIMARY KEY,
    idPersona NVARCHAR(50) NOT NULL,
    idPublicacion NVARCHAR(50) NOT NULL,
    CONSTRAINT FK_Favoritos_Persona FOREIGN KEY (idPersona) REFERENCES Persona(id),
    CONSTRAINT FK_Favoritos_Publicacion FOREIGN KEY (idPublicacion) REFERENCES Publicaciones(id),
    CONSTRAINT UQ_Favorito UNIQUE (idPersona, idPublicacion)
);
GO
-- Creaci�n de tabla Rese�a
CREATE TABLE Rese�a (
    id NVARCHAR(50) PRIMARY KEY,
    calificacion INT NOT NULL,
    comentario TEXT,
    idPublicacion NVARCHAR(50) NOT NULL,
    idPersona NVARCHAR(50) NOT NULL,
    CONSTRAINT FK_Rese�a_Publicacion FOREIGN KEY (idPublicacion) REFERENCES Publicaciones(id),
    CONSTRAINT FK_Rese�a_Persona FOREIGN KEY (idPersona) REFERENCES Persona(id)
);
GO
-- Actualizaci�n de la referencia circular entre Publicaciones y Rese�a
ALTER TABLE Publicaciones
ADD CONSTRAINT FK_Publicaciones_Rese�a FOREIGN KEY (idRese�a) REFERENCES Rese�a(id);
GO
-- Creaci�n de tabla FotosPublicaciones
CREATE TABLE FotosPublicaciones (
    id NVARCHAR(50) PRIMARY KEY,
    foto VARCHAR(255) NOT NULL,
    idPublicacion NVARCHAR(50) NOT NULL,
    CONSTRAINT FK_FotosPublicaciones_Publicacion FOREIGN KEY (idPublicacion) REFERENCES Publicaciones(id)
);
GO
-- Creaci�n de tabla Notificaciones
CREATE TABLE Notificaciones (
    id NVARCHAR(50) PRIMARY KEY,
    idPersona NVARCHAR(50) NOT NULL,
    idTipoAccion NVARCHAR(50) NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    CONSTRAINT FK_Notificaciones_Persona FOREIGN KEY (idPersona) REFERENCES Persona(id),
    CONSTRAINT FK_Notificaciones_TipoAccion FOREIGN KEY (idTipoAccion) REFERENCES TipoAccion(id)
);
GO
-- Creaci�n de tabla Chat
CREATE TABLE Chat (
    id NVARCHAR(50) PRIMARY KEY,
    usuario1_id NVARCHAR(50) NOT NULL,
    usuario2_id NVARCHAR(50) NOT NULL,
    fecha_creacion DATETIME NOT NULL,
    CONSTRAINT FK_Chat_Usuario1 FOREIGN KEY (usuario1_id) REFERENCES Persona(id),
    CONSTRAINT FK_Chat_Usuario2 FOREIGN KEY (usuario2_id) REFERENCES Persona(id)
);
GO
-- Creaci�n de tabla Mensajes
CREATE TABLE Mensajes (
    id NVARCHAR(50) PRIMARY KEY,
    chat_id NVARCHAR(50) NOT NULL,
    autor_id NVARCHAR(50) NOT NULL,
    mensaje TEXT NOT NULL,
    hora DATETIME NOT NULL,
    CONSTRAINT FK_Mensajes_Chat FOREIGN KEY (chat_id) REFERENCES Chat(id),
    CONSTRAINT FK_Mensajes_Autor FOREIGN KEY (autor_id) REFERENCES Persona(id)
);
GO
-- Creaci�n de tabla Contactanos
CREATE TABLE Contactanos (
    id NVARCHAR(50) PRIMARY KEY,
    idPersona NVARCHAR(50) NOT NULL,
    idRazon NVARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL,
    CONSTRAINT FK_Contactanos_Persona FOREIGN KEY (idPersona) REFERENCES Persona(id),
    CONSTRAINT FK_Contactanos_Razon FOREIGN KEY (idRazon) REFERENCES Razones(idRazon)
);
GO
-- Creaci�n de tabla ArchivosAdjuntos
CREATE TABLE ArchivosAdjuntos (
    id NVARCHAR(50) PRIMARY KEY,
    archivo VARCHAR(255) NOT NULL,
    idMensaje NVARCHAR(50) NOT NULL,
    CONSTRAINT FK_ArchivosAdjuntos_Mensaje FOREIGN KEY (idMensaje) REFERENCES Mensajes(id)
);
GO
-- Creaci�n de tabla Reportes
CREATE TABLE Reportes (
    idReporte NVARCHAR(50) PRIMARY KEY,
    idTipoReporte NVARCHAR(50) NOT NULL,
    idEstado NVARCHAR(50) NOT NULL,
    fechaReportada DATETIME NOT NULL,
    fechaActualizacion DATETIME,
    leido BIT NOT NULL DEFAULT 0,
    idReportante NVARCHAR(50) NOT NULL,
    idReportado NVARCHAR(50) NOT NULL,
    idMotivo NVARCHAR(50) NOT NULL,
    descripcion TEXT,
    CONSTRAINT FK_Reportes_TipoReporte FOREIGN KEY (idTipoReporte) REFERENCES TiposReporte(id),
    CONSTRAINT FK_Reportes_Estado FOREIGN KEY (idEstado) REFERENCES EstadosReporte(id),
    CONSTRAINT FK_Reportes_Reportante FOREIGN KEY (idReportante) REFERENCES Persona(id),
    CONSTRAINT FK_Reportes_Reportado FOREIGN KEY (idReportado) REFERENCES Persona(id),
    CONSTRAINT FK_Reportes_Motivo FOREIGN KEY (idMotivo) REFERENCES MotivosReporte(id)
);
GO

-- Anexo de los motivos de reporte a la tabla.

INSERT INTO [dbo].[MotivosReporte] ([id], [nombre]) VALUES ('MO001', 'Contenido inapropiado');
INSERT INTO [dbo].[MotivosReporte] ([id], [nombre]) VALUES ('MO002', 'Spam o publicidad');
INSERT INTO [dbo].[MotivosReporte] ([id], [nombre]) VALUES ('MO003', 'Acoso o bullying');
INSERT INTO [dbo].[MotivosReporte] ([id], [nombre]) VALUES ('MO004', 'Información falsa');
INSERT INTO [dbo].[MotivosReporte] ([id], [nombre]) VALUES ('MO005', 'Incitación a la violencia');
INSERT INTO [dbo].[MotivosReporte] ([id], [nombre]) VALUES ('MO006', 'Infracción de derechos de autor');
INSERT INTO [dbo].[MotivosReporte] ([id], [nombre]) VALUES ('MO007', 'Otra razón');
GO

-- Anexo de los tipos de reporte a la tabla.

INSERT INTO [dbo].[TiposReporte] ([id], [nombre]) VALUES ('TR001', 'Usuario');
INSERT INTO [dbo].[TiposReporte] ([id], [nombre]) VALUES ('TR002', 'Publicación');
GO

-- Anexo de los estados de reporte a la tabla.  

INSERT INTO [dbo].[EstadosReporte] ([id], [nombre]) VALUES ('ER001', 'Pendiente');
INSERT INTO [dbo].[EstadosReporte] ([id], [nombre]) VALUES ('ER002', 'En revisión');
INSERT INTO [dbo].[EstadosReporte] ([id], [nombre]) VALUES ('ER003', 'Resuelto');
INSERT INTO [dbo].[EstadosReporte] ([id], [nombre]) VALUES ('ER004', 'Rechazado');
GO
