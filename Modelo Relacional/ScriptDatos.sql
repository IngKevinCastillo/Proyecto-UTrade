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

-- Anexo de las categorías de publicaciones a la tabla.

INSERT INTO [dbo].[CategoriaPublicacion] ([id], [nombre]) VALUES ('CAT01', 'Rentas');
INSERT INTO [dbo].[CategoriaPublicacion] ([id], [nombre]) VALUES ('CAT02', 'Compras');
GO

-- Anexo de los estados de usuario a la tabla.

INSERT INTO [dbo].[Estados] ([id], [nombre]) VALUES ('EST01', 'Activo');
INSERT INTO [dbo].[Estados] ([id], [nombre]) VALUES ('EST02', 'Baneado');
INSERT INTO [dbo].[Estados] ([id], [nombre]) VALUES ('EST03', 'Eliminado');
INSERT INTO [dbo].[Estados] ([id], [nombre]) VALUES ('EST04', 'Suspendido');
INSERT INTO [dbo].[Estados] ([id], [nombre]) VALUES ('EST05', 'Advertido');
GO

-- Anexo de los roles de usuario a la tabla.

INSERT INTO [dbo].[Rol] ([id], [nombre]) VALUES ('ROL01', 'Administrador');
INSERT INTO [dbo].[Rol] ([id], [nombre]) VALUES ('ROL02', 'Usuario');
GO
