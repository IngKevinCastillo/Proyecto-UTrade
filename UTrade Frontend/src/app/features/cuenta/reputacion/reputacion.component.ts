import { Component, OnInit } from '@angular/core';
import { EstadosService } from '../../../Services/estados.service';
import { PerfilService } from '../../../Services/perfil.service';
import { PersonaService } from '../../../Services/persona.service';
import { Estados } from '../../../interfaces/estados';
import { Persona } from '../../../interfaces/persona';

interface ReputacionConfig {
  titulo: string;
  mensaje: string;
  color: string;
  gradiente: string;
  icono: string;
  progreso: number;
  clase: string;
}

@Component({
  selector: 'app-reputacion',
  templateUrl: './reputacion.component.html',
  styleUrls: ['./reputacion.component.css']
})
export class ReputacionComponent implements OnInit {
  
  estadoActual: Estados | null = null;
  configuracionReputacion: ReputacionConfig | null = null;
  cargando = true;
  error = false;
  Persona: Persona | null = null;
  listaEstados: Estados[] = [];


  private configuracionesEstado: { [key: string]: ReputacionConfig } = {
    'EST01': { // Activo
      titulo: 'Tu cuenta está en orden',
      mensaje: 'Gracias por respetar las reglas de la comunidad. Mantén este buen comportamiento.',
      color: '#00d26a',
      gradiente: 'linear-gradient(90deg, #00d26a 0%, #00b894 100%)',
      icono: '✓',
      progreso: 100,
      clase: 'estado-activo'
    },
    'EST02': { // Baneado
      titulo: 'Cuenta suspendida permanentemente',
      mensaje: 'Tu cuenta ha sido suspendida por violaciones graves de las reglas de la comunidad.',
      color: '#f84142',
      gradiente: 'linear-gradient(90deg, #f84142 0%, #d63031 100%)',
      icono: '✕',
      progreso: 0,
      clase: 'estado-baneado'
    },
    'EST04': { // Suspendido
      titulo: 'Cuenta temporalmente suspendida',
      mensaje: 'Tu cuenta está suspendida temporalmente. Revisa las reglas y espera a que se levante la suspensión.',
      color: '#fdcb6e',
      gradiente: 'linear-gradient(90deg, #fdcb6e 0%, #e17055 100%)',
      icono: '⏸',
      progreso: 25,
      clase: 'estado-suspendido'
    },
    'EST05': { // Advertido
      titulo: 'Cuenta con advertencias',
      mensaje: 'Has recibido advertencias por comportamiento inapropiado. Ten cuidado con futuras acciones.',
      color: '#ffeaa7',
      gradiente: 'linear-gradient(90deg, #ffeaa7 0%, #fdcb6e 100%)',
      icono: '⚠',
      progreso: 60,
      clase: 'estado-advertido'
    }
  };

  constructor(
    private estadosService: EstadosService,
    private perfilService: PerfilService,
    private personaService: PersonaService
  ) {}

  ngOnInit(): void {
    this.cargarReputacionUsuario();
  }

  private cargarReputacionUsuario(): void {
    try {
      this.cargando = true;
      this.error = false;

      
      const usuarioActual = this.perfilService.obtenerUsuarioLocal();
      
      if (!usuarioActual || !usuarioActual.idUsuario) {
        throw new Error('No se pudo obtener el usuario actual');
      }

      console.log('Usuario actual obtenido:', usuarioActual);

     
      this.cargarDatosCompletos(usuarioActual.idUsuario);

    } catch (error) {
      console.error('Error al obtener usuario de sesión:', error);
      this.mostrarError('No se pudo obtener el usuario de la sesión. Verifica que hayas iniciado sesión.');
    }
  }

  buscarPersona(id: string): void {
    this.personaService.buscar(id).subscribe({
      next: (res) => {
        if (res.estado && res.valor) {
          this.Persona = res.valor;
          console.log('Persona encontrada:', this.Persona);
        } else {
          console.error('No se encontró la persona con ID:', id);
          this.mostrarError('No se encontraron datos de la persona.');
        }
      },
      error: (error) => {
        console.error('Error al buscar persona:', error);
        this.mostrarError('Error al buscar los datos de la persona.');
      }
    });
  }

  private cargarDatosCompletos(userId: string): void {
    let personaCargada = false;
    let estadosCargados = false;

    // Cargar datos del usuario
    this.personaService.buscar(userId).subscribe({
      next: (res) => {
        if (res.estado && res.valor) {
          this.Persona = res.valor;
          personaCargada = true;
          console.log('Persona cargada:', this.Persona);
          
          // Verificar si ambos datos están listos
          if (estadosCargados) {
            this.procesarReputacion();
          }
        } else {
          this.mostrarError('No se encontraron datos del usuario.');
        }
      },
      error: (error) => {
        console.error('Error al cargar datos del usuario:', error);
        this.mostrarError('Error al cargar los datos del usuario.');
      }
    });

    // Cargar lista de estados
    this.estadosService.lista().subscribe({
      next: (res) => {
        if (res.estado && res.valor) {
          this.listaEstados = res.valor;
          estadosCargados = true;
          console.log('Estados cargados:', this.listaEstados);
          
          // Verificar si ambos datos están listos
          if (personaCargada) {
            this.procesarReputacion();
          }
        } else {
          this.mostrarError('No se pudo cargar la lista de estados.');
        }
      },
      error: (error) => {
        console.error('Error al cargar estados:', error);
        this.mostrarError('Error al cargar los estados del sistema.');
      }
    });
  }

  private procesarReputacion(): void {
    try {
      if (!this.Persona || !this.Persona.idEstado) {
        console.error('Estado de usuario no disponible:', this.Persona);
        console.error('Lista de estados:', this.listaEstados);
        throw new Error('No se pudo obtener el estado del usuario');
      }

      console.log('Procesando reputación para estado:', this.Persona.idEstado);

      // Encontrar el estado actual del usuario
      this.estadoActual = this.listaEstados.find((estado: Estados) => 
        estado.id === this.Persona?.idEstado
      ) || null;

      if (!this.estadoActual) {
        throw new Error(`Estado de usuario no válido: ${this.Persona.idEstado}`);
      }

      console.log('Estado encontrado:', this.estadoActual);

      // Configurar la reputación según el estado
      this.configurarReputacion();
      this.cargando = false;

    } catch (error) {
      console.error('Error al procesar la reputación:', error);
      this.mostrarError('Error al procesar el estado de la cuenta.');
    }
  }

  private mostrarError(mensaje: string): void {
    this.error = true;
    this.cargando = false;
    this.configuracionReputacion = {
      titulo: 'Error al cargar estado',
      mensaje: mensaje,
      color: '#74b9ff',
      gradiente: 'linear-gradient(90deg, #74b9ff 0%, #0984e3 100%)',
      icono: '?',
      progreso: 50,
      clase: 'estado-error'
    };
  }

  private configurarReputacion(): void {
    if (!this.estadoActual) return;

    // Usar la configuración predefinida para el estado
    this.configuracionReputacion = this.configuracionesEstado[this.estadoActual.id];

    // Si no existe configuración para el estado, usar una por defecto
    if (!this.configuracionReputacion) {
      this.configuracionReputacion = {
        titulo: `Estado: ${this.estadoActual.nombre}`,
        mensaje: 'Estado de cuenta no reconocido. Contacta con soporte si hay algún problema.',
        color: '#74b9ff',
        gradiente: 'linear-gradient(90deg, #74b9ff 0%, #0984e3 100%)',
        icono: '◯',
        progreso: 50,
        clase: 'estado-desconocido'
      };
    }
  }

  // Método para recargar manualmente la reputación
  recargarReputacion(): void {
    this.cargarReputacionUsuario();
  }

  // Obtener el texto del progreso
  get textoProgreso(): string {
    if (!this.configuracionReputacion) return '';
    
    const progreso = this.configuracionReputacion.progreso;
    if (progreso === 100) return 'En orden';
    if (progreso >= 60) return 'Limitada';
    if (progreso >= 25) return 'En peligro';
    return 'Suspendida';
  }

  // Obtener el subtítulo según el progreso
  get subtituloProgreso(): string {
    if (!this.configuracionReputacion) return '';
    
    const progreso = this.configuracionReputacion.progreso;
    if (progreso === 100) return 'Tu cuenta funciona normalmente';
    if (progreso >= 60) return 'Algunas funciones pueden estar limitadas';
    if (progreso >= 25) return 'Cuenta en riesgo de suspensión';
    return 'Acceso restringido a la plataforma';
  }
}