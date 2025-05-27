import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Reporte } from '../../../../interfaces/reporte';
import { PersonaService } from '../../../../Services/persona.service';
import { ProductoService } from '../../../../Services/producto.service';
import { Persona } from '../../../../interfaces/persona';
import { Publicaciones } from '../../../../interfaces/publicaciones';
import { FotosPublicacion } from '../../../../interfaces/fotos-publicacion';
import { FotosPublicacionesService } from '../../../../Services/fotos-publicaciones.service';
import { tipoReporteService } from '../../../../Services/tipoReporte.service';
import { RespuestaAPI } from '../../../../interfaces/respuesta-api';

@Component({
  selector: 'app-resuelto',
  templateUrl: './resuelto.component.html',
  styleUrls: ['./resuelto.component.css']
})
export class ResueltoComponent implements OnInit {
  persona: Persona | null = null;
  producto: Publicaciones | null = null;
  esUsuario: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { reporte: Reporte },
    private dialogRef: MatDialogRef<ResueltoComponent>,
    private personaService: PersonaService,
    private productoService: ProductoService,
    private tipoService: tipoReporteService,
    private fotosService: FotosPublicacionesService
  ) {}

  ngOnInit(): void {
    this.tipoService.buscar(this.data.reporte.idTipoReporte).subscribe(res => {
      if (res.estado && res.valor.nombre.toLowerCase().includes('usuario')) {
        this.cargarUsuario(res);
      } else {
        this.cargarPublicacion(res);
      }
    });
  }

  cargarUsuario(res: RespuestaAPI): void {
    this.esUsuario = true;
    this.personaService.buscar(this.data.reporte.idReportado).subscribe(res => {
      if (res.estado) this.persona = res.valor;
    });
  }

  cargarPublicacion(res: RespuestaAPI): void {
    this.esUsuario = false;
    this.productoService.buscar(this.data.reporte.idReportado).subscribe(res => {
      if (res.estado) this.producto = res.valor;
    });
  }

  formatearFecha(fechaInput: string | Date): string {
    let fecha: Date;
    
    if (fechaInput instanceof Date) {
      // Para objetos Date, crear nueva fecha desde los componentes individuales
      // para evitar problemas de zona horaria
      fecha = new Date(fechaInput.getFullYear(), fechaInput.getMonth(), fechaInput.getDate(), 12, 0, 0);
    } else {
      // Para strings, parsearlo normalmente
      fecha = new Date(fechaInput);
      
      // Si es solo una fecha (sin hora), añadir hora del mediodía
      if (fechaInput.includes('T') === false && fechaInput.includes(' ') === false) {
        fecha = new Date(fechaInput + 'T12:00:00');
      }
    }

    // Verificar si es solo fecha (sin hora específica) para fechas de nacimiento
    const soloFecha = fechaInput instanceof Date || 
                     (!fechaInput.toString().includes(':') && !fechaInput.toString().includes('T'));

    if (soloFecha) {
      // Para fechas de nacimiento (sin hora)
      return fecha.toLocaleDateString('es-CO', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } else {
      // Para fechas con hora (publicaciones)
      return fecha.toLocaleDateString('es-CO', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      });
    }
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.style.display = 'none';
    
    // Mostrar el placeholder correspondiente
    const container = target.closest('.foto-publicacion-container, .contenedor-foto');
    if (container) {
      const placeholder = container.querySelector('.foto-placeholder, .foto-publicacion-placeholder');
      if (placeholder) {
        (placeholder as HTMLElement).style.display = 'flex';
      }
    }
  }

  obtenerImagenPerfil(): string | null {
    if (!this.persona) return null;

    if (this.persona.fotoPerfilBase64 && this.persona.fotoPerfilBase64.trim()) {
      if (this.persona.fotoPerfilBase64.startsWith('data:image')) {
        return this.persona.fotoPerfilBase64;
      }
      return `data:image/jpeg;base64,${this.persona.fotoPerfilBase64}`;
    }

    if (this.persona.fotoPerfil && this.persona.fotoPerfil.trim()) {
      if (this.persona.fotoPerfil.startsWith('http')) {
        return this.persona.fotoPerfil;
      }
      if (this.persona.fotoPerfil.length > 100) {
        return `data:image/jpeg;base64,${this.persona.fotoPerfil}`;
      }
    }

    return null;
  }

  obtenerImagenPublicacion(foto: FotosPublicacion): string | null {
    if (!foto) {
      console.log('No hay objeto foto');
      return null;
    }

    console.log('Procesando foto:', foto);

    // Verificar fotoBase64 primero (más probable que sea la correcta)
    if (foto.fotoBase64 && foto.fotoBase64.trim()) {
      if (foto.fotoBase64.startsWith('data:image')) {
        console.log('Usando fotoBase64 con data:image');
        return foto.fotoBase64;
      }
      console.log('Usando fotoBase64 añadiendo prefijo');
      return `data:image/jpeg;base64,${foto.fotoBase64}`;
    }

    // Si no hay fotoBase64, intentar con foto
    if (foto.foto && foto.foto.trim()) {
      if (foto.foto.startsWith('http')) {
        console.log('Usando foto como URL');
        return foto.foto;
      }
      // Si parece ser base64 (muy largo)
      if (foto.foto.length > 100) {
        console.log('Usando foto como base64');
        return `data:image/jpeg;base64,${foto.foto}`;
      }
    }

    console.log('No se pudo obtener imagen para:', foto);
    return null;
  }

  // Método para obtener la clase CSS según el número de fotos
  obtenerClaseGaleria(): string {
    if (!this.producto?.fotosPublicaciones) return '';
    
    const numFotos = this.producto.fotosPublicaciones.length;
    return `galeria-${numFotos}-fotos`;
  }

  // Método para verificar si hay fotos válidas
  tieneFotosValidas(): boolean {
    if (!this.producto?.fotosPublicaciones) return false;
    
    return this.producto.fotosPublicaciones.some(foto => 
      this.obtenerImagenPublicacion(foto) !== null
    );
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}