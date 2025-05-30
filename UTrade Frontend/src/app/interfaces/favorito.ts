export interface Usuario {
  idUsuario: string;
  correo: string;
  contraseña: string;
  telefono: string;
}

export interface Favorito {
  id: string;
  idPersona: string;
  idPublicacion: string;
}

export interface FavoritoExtendido extends Favorito {
  titulo?: string;
  descripcion?: string;
  precio?: number;
  fechaPublicacion?: string;
  nombreUsuario?: string;
  avatarUsuario?: string;
  nombreCategoria?: string;
  estadoNombre?: string;
  fechaFormateada?: string;
  tiempoTranscurrido?: string;
  imagenes?: string[];
  cuota?: string;
  imagen?: string;
  fechaPublicacionDate?: Date;
  direccion?: string;
  altitud?: number;
  latitud?: number;
  esFavorito?: boolean;
}

export interface RespuestaAPI<T> {
  estado: boolean;
  valor: T;
  mgs: string | null;
}

export interface Publicacion {
  id: string;
  titulo: string;
  descripcion: string;
  precio: number;
  fechaPublicacion: string;
  idUsuario: string;
  idCategoria: string;
  idEstado: string;
  direccion: string;
  altitud: number;
  latitud: number;
  fotosPublicaciones: any[];
}

export interface Persona {
  id: string;
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  genero: string;
  idRol: string;
  nombreUsuario: string;
  contraseña: string;
  correo: string;
  telefono: string;
  fotoPerfilBase64: string;
}

export interface FotoPublicacion {
  id: string;
  foto: string;
}
