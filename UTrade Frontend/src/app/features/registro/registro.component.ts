import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VentanaConfirmarComponent } from './confirmar-codigo/ventana-confirmar/ventana-confirmar.component';
import { RegistroService } from '../../Services/registro.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  registroData = {
    nombres: '',
    apellidos: '',
    nombreUsuario: '',
    email: '',
    fechaNacimiento: '',
    genero: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  };

  showPassword = false;
  showConfirmPassword = false;
  errorMessage = '';

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private registroService: RegistroService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  registrarCuenta(): void {
    if (!this.validateForm()) return;

    this.errorMessage = '';

    this.registroService
      .obtenerPorUsuario(this.registroData.nombreUsuario)
      .subscribe({
        next: (res) => {
          if (res.estado && res.valor) {
            this.toastr.error('El nombre de usuario ya está en uso.', 'Error', {
              timeOut: 3000,
              progressBar: true,
              closeButton: true,
            });
          } else {
            this.continuarRegistro();
          }
        },
        error: (err) => {
          this.toastr.error(
            'Error al verificar el nombre de usuario.',
            'Error',
            {
              timeOut: 3000,
              progressBar: true,
              closeButton: true,
            }
          );
          this.continuarRegistro();
        },
      });
  }

  private continuarRegistro(): void {
    const fechaISO = new Date(this.registroData.fechaNacimiento).toISOString();

    this.registroService.generarCodigoRegistro(`"${fechaISO}"`).subscribe({
      next: (res) => {
        if (res.estado) {
          const codigo = res.valor;
          const payload = {
            correoDestino: this.registroData.email,
            asunto: 'Código de verificación para crear tu cuenta',
            codigoVerficacion: codigo,
          };

          this.registroService.enviarCorreoVerificacion(payload).subscribe({
            next: () => {
              this.abrirVentanaConfirmacion(codigo);
            },
            error: (err) => {
              this.toastr.error(
                'Error al enviar el código de verificación.',
                'Error',
                {
                  timeOut: 3000,
                  progressBar: true,
                  closeButton: true,
                }
              );
            },
          });
        } else {
          this.toastr.error(
            'Error al generar el código de verificación.',
            'Error',
            {
              timeOut: 3000,
              progressBar: true,
              closeButton: true,
            }
          );
        }
      },
      error: (err) => {
        this.toastr.error(
          'Error al generar el código de verificación.',
          'Error',
          {
            timeOut: 3000,
            progressBar: true,
            closeButton: true,
          }
        );
      },
    });
  }

  registrarPersona(): void {
    const generoMayuscula = this.registroData.genero.charAt(0).toUpperCase();
    this.registroService.obtenerIdNuevoUsuario().subscribe({
      next: (res) => {
        if (res.estado && res.valor) {
          const nuevaPersona = {
            id: res.valor,
            nombres: this.registroData.nombres,
            apellidos: this.registroData.apellidos,
            fechaNacimiento: this.registroData.fechaNacimiento,
            genero: generoMayuscula,
            idRol: 'ROL02',
            nombreUsuario: this.registroData.nombreUsuario,
            contraseña: this.registroData.password,
            correo: this.registroData.email,
            telefono: null,
            fotoPerfilBase64: null,
            fotoPerfil: null,
            idEstado: 'EST01',
          };

          this.registroService.registrarPersona(nuevaPersona).subscribe({
            next: () => {
              this.toastr.success('✔️ Persona registrada con éxito', 'Éxito', {
                timeOut: 3000,
                progressBar: true,
                closeButton: true,
              });
              this.router.navigate(['/login']);
            },
            error: () => {
              this.toastr.error('❌ Error al registrar persona', 'Error', {
                timeOut: 3000,
                progressBar: true,
                closeButton: true,
              });
            },
          });
        } else {
          this.toastr.error(
            'No se pudo generar un nuevo ID de usuario.',
            'Error',
            {
              timeOut: 3000,
              progressBar: true,
              closeButton: true,
            }
          );
        }
      },
      error: () => {
        this.toastr.error(
          'Error al obtener el ID del nuevo usuario.',
          'Error',
          {
            timeOut: 3000,
            progressBar: true,
            closeButton: true,
          }
        );
      },
    });
  }

  abrirVentanaConfirmacion(codigo: string): void {
    this.dialog
      .open(VentanaConfirmarComponent, {
        disableClose: false,
        autoFocus: true,
        closeOnNavigation: true,
        panelClass: 'modal-reporte-personalizado',
        width: '650px',
        maxWidth: '95%',
        data: {
          tipo: 'CREAR',
          tipoObjeto: 'publicacion',
          email: this.registroData.email,
          codigo: codigo,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result?.verificado) {
          this.registrarPersona();
        } else {
          this.toastr.error('❌ Código no confirmado por el usuario', 'Error', {
            timeOut: 3000,
            progressBar: true,
            closeButton: true,
          });
        }
      });
  }

  private validateForm(): boolean {
    this.errorMessage = '';

    if (
      !this.registroData.nombres ||
      !this.registroData.apellidos ||
      !this.registroData.nombreUsuario ||
      !this.registroData.email ||
      !this.registroData.fechaNacimiento ||
      !this.registroData.genero ||
      !this.registroData.password ||
      !this.registroData.confirmPassword
    ) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return false;
    }

    if (this.registroData.password !== this.registroData.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return false;
    }

    if (!this.registroData.termsAccepted) {
      this.errorMessage = 'Debes aceptar los términos y condiciones.';
      return false;
    }

    return true;
  }
}
