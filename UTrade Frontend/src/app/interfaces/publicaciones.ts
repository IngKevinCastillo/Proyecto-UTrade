export interface Publicaciones {
    id: string;
    titulo: string;
    fechaPublicacion: string; // Si lo recibes como texto de la API
    idUsuario: string;
    precio?: number;
    idCategoria?: string;
    descripcion?: string;
    ubicacion?: string;
    idReseña?: string;
    idEstado: string;
  }
  