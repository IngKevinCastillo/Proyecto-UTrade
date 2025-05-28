import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Reporte } from '../../../../interfaces/reporte';
import { PersonaService } from '../../../../Services/persona.service';
import { ProductoService } from '../../../../Services/producto.service';
import { Persona } from '../../../../interfaces/persona';
import { EstadosService } from '../../../../Services/estados.service';
import { CategoriaPublicacionService } from '../../../../Services/categoria-publicacion.service'; 
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
  nombre: string = '';
  nombreEstado: string = '';
  categoria: string = '';
  esUsuario: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { reporte: Reporte },
    private dialogRef: MatDialogRef<ResueltoComponent>,
    private personaService: PersonaService,
    private productoService: ProductoService,
    private tipoService: tipoReporteService,
    private fotosPublicacionService: FotosPublicacionesService,
    private estadosService: EstadosService,
    private categoriaPublicacionService: CategoriaPublicacionService  
    
  ) {}

  ngOnInit(): void {
    this.buscarSegunTipoReporte();
  }

  buscarSegunTipoReporte(): void {
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
      this.cargarFotosPublicacion(this.producto?.id || ''); 
      this.buscarEstado(this.producto?.idEstado || ''); 
      this.buscarCategoria(this.producto?.idCategoria || '');
      this.buscarNombre(this.producto?.idUsuario || '');
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

  cargarFotosPublicacion(idPublicacion: string): void {
    this.fotosPublicacionService.buscarFotosPublicacion(idPublicacion).subscribe({
      next: (res) => {
        if (res.estado && this.producto) {

          this.producto.fotosPublicaciones = res.valor;
          const tieneFotos = this.tieneFotosValidas();
        } else {
          if (this.producto) {
            this.producto.fotosPublicaciones = [];
          }
        }
      },
      error: (error) => {
        if (this.producto) {
          this.producto.fotosPublicaciones = [];
        }
      }
    });
  }

  // Método para obtener la clase CSS según el número de fotos
  obtenerImagenPublicacion(foto: FotosPublicacion): string | null {
    if (!foto) {
      return null;
    }

    // 1. Verificar fotoBase64 primero (más común en aplicaciones)
    if (foto.fotoBase64 && foto.fotoBase64.trim() !== '') {
      try {
        // Si ya tiene el prefijo data:image
        if (foto.fotoBase64.startsWith('data:image')) {
          return foto.fotoBase64;
        }
        
        // Si es base64 puro, agregar prefijo
        if (this.esBase64Valido(foto.fotoBase64)) {
          return `data:image/jpeg;base64,${foto.fotoBase64}`;
        }
      } catch (error) {
        console.warn('⚠️ Error procesando fotoBase64:', error);
      }
    }

    // 2. Verificar campo foto como fallback
    if (foto.foto && foto.foto.trim() !== '') {
      try {
        // Si es una URL completa
        if (foto.foto.startsWith('http://') || foto.foto.startsWith('https://')) {
          return foto.foto;
        }
        
        // Si ya tiene prefijo data:image
        if (foto.foto.startsWith('data:image')) {
          return foto.foto;
        }
        
        // Si parece ser base64 (longitud considerable y caracteres válidos)
        if (this.esBase64Valido(foto.foto) && foto.foto.length > 100) {
          return `data:image/jpeg;base64,${foto.foto}`;
        }
      } catch (error) {
        console.warn('⚠️ Error procesando foto:', error);
      }
    }
    return null;
  }

  // ====== MÉTODO AUXILIAR PARA VALIDAR BASE64 ======
  private esBase64Valido(str: string): boolean {
    if (!str || str.length === 0) {
      return false;
    }
    
    try {
      // Remover espacios en blanco
      const cleanStr = str.trim();
      
      // Verificar que solo contenga caracteres base64 válidos
      const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
      
      // Verificar longitud (debe ser múltiplo de 4 después de padding)
      const validLength = cleanStr.length % 4 === 0;
      
      return base64Regex.test(cleanStr) && validLength && cleanStr.length > 0;
    } catch {
      return false;
    }
  }

  // ====== MÉTODO PARA OBTENER CLASE CSS SEGÚN NÚMERO DE FOTOS ======
  obtenerClaseGaleria(): string {
    if (!this.producto?.fotosPublicaciones) return '';
    
    const numFotos = this.producto.fotosPublicaciones.length;
    return `galeria-${numFotos}-fotos`;
  }

  // ====== MÉTODO PARA VERIFICAR SI HAY FOTOS VÁLIDAS (MEJORADO) ======
  tieneFotosValidas(): boolean {
    if (!this.producto?.fotosPublicaciones || this.producto.fotosPublicaciones.length === 0) {
      return false;
    }
    // Verificar cada foto individualmente
    const fotosValidas = this.producto.fotosPublicaciones.filter((foto, index) => {
      const esValida = this.obtenerImagenPublicacion(foto) !== null;
      return esValida;
    });
    
    const resultado = fotosValidas.length > 0;   
    return resultado;
  }


  buscarEstado(id: string): void {   
    this.estadosService.buscar(id).subscribe({
      next: (res) => {       
        if (res.estado) {
          this.nombreEstado = res.valor.nombre;
        } else {
          this.nombreEstado = 'Estado no encontrado';
        }
      },
      error: (error) => {
        this.nombreEstado = 'Error al cargar estado';
      }
    });
  }

  buscarCategoria(id: string): void {   
    this.categoriaPublicacionService.buscar(id).subscribe({
      next: (res) => {       
        if (res.estado) {
          this.categoria = res.valor.nombre;
        } else {
          this.categoria = 'Categoría no encontrada';
        }
      },
      error: (error) => {
        this.categoria = 'Error al cargar categoría';
      }
    });
  }

  buscarNombre(id: string): void {   
    console.log('Buscando nombre para ID:', id);
    this.personaService.buscar(id).subscribe({
      next: (res) => {       
        if (res.estado) {
          this.nombre = res.valor.nombres;
          console.log('Nombre encontrado:', this.nombre);
        } else {
          console.warn('Nombre no encontrado para ID:', id);
          this.nombre = 'Nombre no encontrado';
        }
      },
      error: (error) => {
        console.error('Error al buscar nombre:', error);
        this.nombre = 'Error al cargar nombre';
      }
    });
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}