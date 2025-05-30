export interface Notificaciones {
  id: string;
  idPersona: string;
  idTipoAccion: string;
  fecha: Date;
  hora: string;
  estado: boolean; 
  
  nombre?: string; 
  descripcion?: string; 
  tipo?: string; 
  leido?: boolean; 
}