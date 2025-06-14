import { FotosPublicacion } from './fotos-publicacion';

export interface Publicaciones {
  id: string,
  titulo: string,
  fechaPublicacion: string,
  idUsuario: string,
  precio: number,
  idCategoria: string,
  descripcion: string,
  idEstado: string,
  direccion: string,
  altitud: number,
  latitud: number,
  fotosPublicaciones?: FotosPublicacion[];
}
