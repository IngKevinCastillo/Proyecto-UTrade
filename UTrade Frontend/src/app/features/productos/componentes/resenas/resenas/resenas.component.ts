import {
  Component,
  ViewEncapsulation,
  type OnInit,
  type OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { ResenasManagerService } from '../../../../../Services/resenas-manager.service';
import { UsuarioManagerService } from '../../../../../Services/usuario-manager.service';
import { ResenasUtils } from '../../../../../utils/resenas.utils';

import {
  Resena,
  NuevaResena,
  ResenaData,
} from '../../../../../interfaces/resena';
import { Usuario } from '../../../../../interfaces/usuario';

@Component({
  selector: 'app-resenas',
  templateUrl: './resenas.component.html',
  styleUrls: ['./resenas.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ResenasComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  idPublicacion = '';
  idPropietarioPublicacion = '';
  listaResenas: Resena[] = [];
  usuarioActual: Usuario | null = null;

  nuevaResena: NuevaResena = {
    comentario: '',
    calificacion: 0,
  };

  puntuacionHover = 0;
  isSubmitting = false;
  showSuccessMessage = false;
  isLoading = true;

  constructor(
    private resenasManager: ResenasManagerService,
    private usuarioManager: UsuarioManagerService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((queryParams) => {
        this.idPublicacion = queryParams['idPublicacion'];
        this.idPropietarioPublicacion = queryParams['idPropietario'];

        if (this.idPublicacion) {
          this.cargarUsuarioActual();
          this.cargarResenas();
        } else {
          this.isLoading = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarUsuarioActual(): void {
    this.usuarioActual = this.usuarioManager.obtenerUsuarioActual();
  }

  async cargarResenas(): Promise<void> {
    this.isLoading = true;

    try {
      this.resenasManager
        .cargarResenasCompletas(this.idPublicacion, this.usuarioActual)
        .pipe(takeUntil(this.destroy$))
        .subscribe(async (resenas) => {
          if (resenas.length > 0) {
            this.listaResenas =
              await this.resenasManager.enriquecerResenasConDatosUsuarios(
                resenas
              );

            if (this.usuarioActual?.idUsuario) {
              this.listaResenas =
                await this.resenasManager.cargarInformacionLikes(
                  this.listaResenas,
                  this.usuarioActual.idUsuario
                );
            }
          } else {
            this.listaResenas = [];
          }
          this.isLoading = false;
        });
    } catch (error) {
      this.listaResenas = [];
      this.isLoading = false;
    }
  }

  darLike(resena: Resena): void {
    if (!this.usuarioActual?.idUsuario) return;

    this.resenasManager
      .toggleLike(resena, this.usuarioActual.idUsuario)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  verificarResena(resena: Resena): void {
    this.resenasManager
      .verificarResena(resena)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  async enviarResena(): Promise<void> {
    if (this.esPropietarioPublicacion()) {
      this.toastr.error(
        'No puedes dejar una reseña en tu propia publicación.',
        'Error'
      );
      return;
    }

    if (!this.validarFormulario()) return;

    this.isSubmitting = true;

    const resenaData: ResenaData = {
      id: '',
      calificacion: this.nuevaResena.calificacion,
      comentario: this.nuevaResena.comentario,
      idPublicacion: this.idPublicacion,
      idPersona: this.usuarioActual?.idUsuario || '',
      verificado: false,
    };

    this.resenasManager
      .crearResena(resenaData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((exito) => {
        if (exito) {
          this.limpiarFormulario();
          this.cargarResenas();
          this.showSuccessMessage = true;
          setTimeout(() => (this.showSuccessMessage = false), 3000);
        }
        this.isSubmitting = false;
      });
  }

  seleccionarPuntuacion(puntuacion: number): void {
    this.nuevaResena.calificacion = puntuacion;
  }

  establecerHoverEstrella(puntuacion: number): void {
    this.puntuacionHover = puntuacion;
  }

  limpiarHoverEstrella(): void {
    this.puntuacionHover = 0;
  }

  obtenerPuntuacionMostrar(): number {
    return this.puntuacionHover || this.nuevaResena.calificacion;
  }

  validarFormulario(): boolean {
    return ResenasUtils.validarFormularioResena(
      this.nuevaResena.comentario,
      this.nuevaResena.calificacion
    );
  }

  limpiarFormulario(): void {
    this.nuevaResena = { comentario: '', calificacion: 0 };
    this.puntuacionHover = 0;
  }

  puedeCrearResena(): boolean {
    return this.usuarioManager.puedeCrearResena(this.usuarioActual);
  }

  esPropietarioPublicacion(): boolean {
    return this.usuarioManager.esPropietarioPublicacion(
      this.usuarioActual?.idUsuario,
      this.idPropietarioPublicacion
    );
  }

  puedeVerificarResena(resena: Resena): boolean {
    return this.usuarioManager.puedeVerificarResena(
      this.usuarioActual,
      this.idPropietarioPublicacion,
      resena.verificado
    );
  }

  obtenerArrayEstrellas = ResenasUtils.obtenerArrayEstrellas;
  formatearFecha = ResenasUtils.formatearFecha;
  obtenerTiempoTranscurrido = ResenasUtils.obtenerTiempoTranscurrido;
  obtenerTextoCalificacion = ResenasUtils.obtenerTextoCalificacion;
  trackByResenasId = ResenasUtils.trackByResenasId;

  obtenerPromedioCalificaciones(): number {
    return ResenasUtils.obtenerPromedioCalificaciones(this.listaResenas);
  }

  obtenerEstadisticasCalificaciones() {
    return ResenasUtils.obtenerEstadisticasCalificaciones(this.listaResenas);
  }
}
