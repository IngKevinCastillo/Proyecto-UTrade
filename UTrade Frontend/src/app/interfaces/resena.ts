export interface Resena {
  id: string;
  calificacion: number;
  comentario: string;
  idPublicacion: string;
  idPersona: string;
  fecha: string;
  verificado: boolean;
  likes: any[];
  nombreUsuario?: string;
  fotoPerfilUrl?: string;
  fechaResena?: Date;
  cantidadLikes?: number;
  usuarioLeDioLike?: boolean;
  idLikeUsuario?: string | null;
}

export interface NuevaResena {
  comentario: string;
  calificacion: number;
}

export interface ResenaData {
  id: string;
  calificacion: number;
  comentario: string;
  idPublicacion: string;
  idPersona: string;
  verificado: boolean;
}

export interface LikeData {
  id: string;
  IdReseña: string;
  IdPersona: string;
}

export interface EstadisticasCalificaciones {
  [key: number]: number;
}
