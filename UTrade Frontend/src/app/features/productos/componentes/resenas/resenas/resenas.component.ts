import { Component, ViewEncapsulation } from '@angular/core';

interface Resena {
  id: number;
  nombreUsuario: string;
  fotoPerfilUrl: string;
  puntuacion: number;
  comentario: string;
  fechaResena: Date;
  likes?: number;
  verified?: boolean;
}

interface NuevaResena {
  nombreUsuario: string;
  comentario: string;
  puntuacion: number;
}

@Component({
  selector: 'app-resenas',
  templateUrl: './resenas.component.html',
  styleUrls: ['./resenas.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ResenasComponent {
  listaResenas: Resena[] = [
    {
      id: 1,
      nombreUsuario: 'María González',
      fotoPerfilUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      puntuacion: 5,
      comentario:
        'Excelente servicio, muy recomendado. La atención al cliente fue excepcional y el producto superó mis expectativas. Sin duda volveré a confiar en esta empresa.',
      fechaResena: new Date('2024-03-15'),
      likes: 24,
      verified: true,
    },
    {
      id: 2,
      nombreUsuario: 'Carlos Rodríguez',
      fotoPerfilUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      puntuacion: 4,
      comentario:
        'Muy buena experiencia en general. El producto llegó en perfectas condiciones y el empaque es de primera calidad. Solo algunas mejoras menores podrían hacer la diferencia.',
      fechaResena: new Date('2024-03-10'),
      likes: 18,
      verified: true,
    },
    {
      id: 3,
      nombreUsuario: 'Ana Martínez',
      fotoPerfilUrl:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      puntuacion: 5,
      comentario:
        'Increíble calidad y rapidez en la entrega. El servicio al cliente es excepcional y el producto exactamente como se describe. Definitivamente volveré a comprar aquí.',
      fechaResena: new Date('2024-03-08'),
      likes: 31,
      verified: true,
    },
    {
      id: 4,
      nombreUsuario: 'Luis Fernández',
      fotoPerfilUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      puntuacion: 3,
      comentario:
        'Producto correcto y funcional, aunque el tiempo de entrega fue más largo de lo esperado. El empaque podría mejorar pero el contenido está bien. En general satisfecho con la compra.',
      fechaResena: new Date('2024-03-05'),
      likes: 12,
      verified: false,
    },
    {
      id: 5,
      nombreUsuario: 'Carmen López',
      fotoPerfilUrl:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      puntuacion: 5,
      comentario:
        '¡Perfecto en todos los aspectos! Todo llegó en excelentes condiciones, el servicio postventa es fantástico y la calidad supera las expectativas. Experiencia 10/10.',
      fechaResena: new Date('2024-03-01'),
      likes: 45,
      verified: true,
    },
    {
      id: 6,
      nombreUsuario: 'Roberto Silva',
      fotoPerfilUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      puntuacion: 4,
      comentario:
        'Buena relación calidad-precio. El producto cumple con lo prometido y el servicio es confiable. Recomendado para quienes buscan calidad sin complicaciones.',
      fechaResena: new Date('2024-02-28'),
      likes: 22,
      verified: true,
    },
  ];

  nuevaResena: NuevaResena = {
    nombreUsuario: '',
    comentario: '',
    puntuacion: 0,
  };

  puntuacionHover: number = 0;
  isSubmitting: boolean = false;
  showSuccessMessage: boolean = false;

  constructor() {}

  obtenerArrayEstrellas(puntuacion: number): boolean[] {
    return Array.from({ length: 5 }, (_, indice) => indice < puntuacion);
  }

  formatearFecha(fecha: Date): string {
    return fecha.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  obtenerTiempoTranscurrido(fecha: Date): string {
    const ahora = new Date();
    const diferencia = ahora.getTime() - fecha.getTime();
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

    if (dias === 0) return 'Hoy';
    if (dias === 1) return 'Ayer';
    if (dias < 7) return `Hace ${dias} días`;
    if (dias < 30) return `Hace ${Math.floor(dias / 7)} semanas`;
    return this.formatearFecha(fecha);
  }

  seleccionarPuntuacion(puntuacion: number): void {
    this.nuevaResena.puntuacion = puntuacion;
  }

  establecerHoverEstrella(puntuacion: number): void {
    this.puntuacionHover = puntuacion;
  }

  limpiarHoverEstrella(): void {
    this.puntuacionHover = 0;
  }

  obtenerPuntuacionMostrar(): number {
    return this.puntuacionHover || this.nuevaResena.puntuacion;
  }

  obtenerTextoCalificacion(puntuacion: number): string {
    const textos = ['', 'Muy malo', 'Malo', 'Regular', 'Bueno', 'Excelente'];
    return textos[puntuacion] || '';
  }

  async enviarResena(): Promise<void> {
    if (!this.validarFormulario()) return;

    this.isSubmitting = true;

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const nuevaResenaCompleta: Resena = {
      id: this.listaResenas.length + 1,
      nombreUsuario: this.nuevaResena.nombreUsuario,
      fotoPerfilUrl:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
      puntuacion: this.nuevaResena.puntuacion,
      comentario: this.nuevaResena.comentario,
      fechaResena: new Date(),
      likes: 0,
      verified: false,
    };

    this.listaResenas.unshift(nuevaResenaCompleta);
    this.limpiarFormulario();
    this.isSubmitting = false;
    this.showSuccessMessage = true;

    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
  }

  validarFormulario(): boolean {
    return (
      this.nuevaResena.comentario.trim() !== '' &&
      this.nuevaResena.puntuacion > 0
    );
  }

  limpiarFormulario(): void {
    this.nuevaResena = {
      nombreUsuario: '',
      comentario: '',
      puntuacion: 0,
    };
    this.puntuacionHover = 0;
  }

  obtenerPromedioCalificaciones(): number {
    if (this.listaResenas.length === 0) return 0;
    const suma = this.listaResenas.reduce(
      (acc, resena) => acc + resena.puntuacion,
      0
    );
    return parseFloat((suma / this.listaResenas.length).toFixed(1));
  }

  obtenerEstadisticasCalificaciones(): { [key: number]: number } {
    const estadisticas = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    this.listaResenas.forEach((resena) => {
      estadisticas[resena.puntuacion as 1 | 2 | 3 | 4 | 5]++;
    });
    return estadisticas;
  }

  darLike(resena: Resena): void {
    if (resena.likes !== undefined) {
      resena.likes++;
    }
  }

  trackByResenasId(index: number, resena: any): any {
    return resena.id || index;
  }
}
