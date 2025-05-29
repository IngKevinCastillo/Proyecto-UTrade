import { Resena, EstadisticasCalificaciones } from '../interfaces/resena';

export class ResenasUtils {
  static obtenerArrayEstrellas(puntuacion: number): boolean[] {
    return Array.from({ length: 5 }, (_, indice) => indice < puntuacion);
  }

  static formatearFecha(fecha: Date): string {
    return fecha.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  static obtenerTiempoTranscurrido(fecha: Date): string {
    const ahora = new Date();
    const diferencia = ahora.getTime() - fecha.getTime();
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

    if (dias === 0) return 'Hoy';
    if (dias === 1) return 'Ayer';
    if (dias < 7) return `Hace ${dias} días`;
    if (dias < 30) return `Hace ${Math.floor(dias / 7)} semanas`;
    return this.formatearFecha(fecha);
  }

  static obtenerTextoCalificacion(puntuacion: number): string {
    const textos = ['', 'Muy malo', 'Malo', 'Regular', 'Bueno', 'Excelente'];
    return textos[puntuacion] || '';
  }

  static obtenerPromedioCalificaciones(resenas: Resena[]): number {
    if (resenas.length === 0) return 0;
    const suma = resenas.reduce((acc, resena) => acc + resena.calificacion, 0);
    return Number.parseFloat((suma / resenas.length).toFixed(1));
  }

  static obtenerEstadisticasCalificaciones(
    resenas: Resena[]
  ): EstadisticasCalificaciones {
    const estadisticas: EstadisticasCalificaciones = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
    resenas.forEach((resena) => {
      estadisticas[resena.calificacion as 1 | 2 | 3 | 4 | 5]++;
    });
    return estadisticas;
  }

  static validarFormularioResena(
    comentario: string,
    calificacion: number
  ): boolean {
    return comentario.trim() !== '' && calificacion > 0;
  }

  static trackByResenasId(index: number, resena: Resena): string | number {
    return resena.id || index;
  }
}
