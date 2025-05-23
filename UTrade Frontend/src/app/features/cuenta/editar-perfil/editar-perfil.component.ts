import {
  Component,
  type OnInit,
  type ElementRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PerfilService } from '../../../Services/perfil.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css'],
})
export class EditarPerfilComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  profileForm!: FormGroup;
  genderOptions = [
    { value: 'masculino', label: 'Masculino' },
    { value: 'femenino', label: 'Femenino' },
    { value: 'otro', label: 'Otro' },
  ];
  fotoPreview: string | ArrayBuffer | null = 'assets/icons/no-photo.webp';
  fotoPerfilBase64: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private profileService: PerfilService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.setupFormValidators();
    this.cargarDatosUsuario();
  }

  initForm(): void {
    this.profileForm = this.fb.group({
      nombreUsuario: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      correo: [''],
      telefono: [''],
      fechaNacimiento: ['', [Validators.required]],
    });
  }

  setupFormValidators(): void {
    this.profileForm.get('correo')?.valueChanges.subscribe((value) => {
      const correoControl = this.profileForm.get('correo');
      if (value && value.trim() !== '') {
        correoControl?.setValidators([Validators.email]);
      } else {
        correoControl?.clearValidators();
      }
      correoControl?.updateValueAndValidity();
    });

    this.profileForm.get('telefono')?.valueChanges.subscribe((value) => {
      const telefonoControl = this.profileForm.get('telefono');
      if (value && value.trim() !== '') {
        telefonoControl?.setValidators([Validators.pattern(/^\+?\d{7,15}$/)]);
      } else {
        telefonoControl?.clearValidators();
      }
      telefonoControl?.updateValueAndValidity();
    });
  }

  cargarDatosUsuario(): void {
    const idUsuario = this.profileService.obtenerIdUsuario();
    if (!idUsuario) {
      this.toastr.error(
        '¡Ups! No encontramos tu sesión activa 🤔',
        'Usuario no cargado',
        {
          timeOut: 5000,
          progressBar: true,
        }
      );
      return;
    }

    this.profileService.obtenerPerfil(idUsuario).subscribe({
      next: (res) => {
        if (res?.estado && res?.valor) {
          const datos = res.valor;
          const generoMapeado = this.profileService.mapearGenero(datos.genero);

          this.profileForm.patchValue({
            nombreUsuario: datos.nombreUsuario || '',
            nombres: datos.nombres || '',
            apellidos: datos.apellidos || '',
            genero: generoMapeado,
            correo: datos.correo || '',
            telefono: datos.telefono || '',
            fechaNacimiento: datos.fechaNacimiento
              ? datos.fechaNacimiento.substring(0, 10)
              : '',
          });

          if (datos.fotoPerfil && datos.fotoPerfil.trim() !== '') {
            this.fotoPreview = 'data:image/jpeg;base64,' + datos.fotoPerfil;
            this.fotoPerfilBase64 = datos.fotoPerfil;
          } else {
            this.fotoPreview = 'icons/no-photo.webp';
            this.fotoPerfilBase64 = null;
          }

          this.toastr.info(
            'Datos cargados exitosamente 😊',
            '¡Bienvenido de nuevo!',
            {
              timeOut: 3000,
              progressBar: true,
            }
          );
        } else {
          this.toastr.warning(
            'Recibimos una respuesta inesperada del servidor',
            'Algo raro pasó…',
            {
              timeOut: 5000,
              progressBar: true,
            }
          );
        }
      },
      error: (err) => {
        this.toastr.error(
          'No pudimos conectar con el servidor 😵‍💫',
          'Error de red',
          {
            timeOut: 7000,
            progressBar: true,
          }
        );
      },
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const formValues = { ...this.profileForm.value };

      if (
        (!formValues.correo || formValues.correo.trim() === '') &&
        (!formValues.telefono || formValues.telefono.trim() === '')
      ) {
        this.toastr.warning(
          'Debes ingresar al menos un correo o un teléfono 📱',
          'Validación',
          {
            timeOut: 5000,
            progressBar: true,
          }
        );
        return;
      }

      if (formValues.correo && this.profileForm.get('correo')?.invalid) {
        this.toastr.error(
          'Este correo no es válido. Ej: usuario@dominio.com',
          'Correo inválido',
          {
            timeOut: 5000,
            progressBar: true,
          }
        );
        return;
      }

      if (formValues.telefono && this.profileForm.get('telefono')?.invalid) {
        this.toastr.error(
          'Ingresa un teléfono con 10 dígitos',
          'Teléfono inválido',
          {
            timeOut: 5000,
            progressBar: true,
          }
        );
        return;
      }

      const generoBackend = this.profileService.mapearGeneroParaBackend(
        formValues.genero
      );
      const usuario = this.profileService.obtenerUsuarioLocal();

      if (!usuario || !usuario.idUsuario) {
        this.toastr.error(
          'No encontramos tu información de usuario 😢',
          'Error interno',
          {
            timeOut: 5000,
            progressBar: true,
          }
        );
        return;
      }

      const payload = {
        id: usuario.idUsuario,
        nombres: formValues.nombres,
        apellidos: formValues.apellidos,
        fechaNacimiento: formValues.fechaNacimiento,
        genero: generoBackend,
        idRol: usuario.idRol || '',
        nombreUsuario: formValues.nombreUsuario || '',
        contraseña: usuario.contraseña || '',
        correo: formValues.correo || null,
        telefono: formValues.telefono || null,
        fotoPerfilBase64: this.fotoPerfilBase64,
      };

      this.profileService.actualizarPerfil(payload).subscribe({
        next: (res) => {
          if (res.estado) {
            this.toastr.success(
              '¡Listo! Tu perfil se actualizó sin problemas 💾',
              'Actualización exitosa',
              {
                timeOut: 3000,
                progressBar: true,
              }
            );
            this.router.navigate(['/mi-cuenta']);
          } else {
            this.toastr.error(
              `Algo falló: ${res.mensaje || 'mensaje desconocido'}`,
              'Error al guardar',
              {
                timeOut: 6000,
                progressBar: true,
              }
            );
            console.error(res);
          }
        },
        error: (err) => {
          this.toastr.error(
            'Fallo de comunicación con el servidor 🌐',
            'Error de conexión',
            {
              timeOut: 6000,
              progressBar: true,
            }
          );
          console.error(err);
        },
      });
    } else {
      this.markFormGroupTouched(this.profileForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/mi-cuenta']);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.fotoPreview = reader.result;
      this.fotoPerfilBase64 = (reader.result as string).split(',')[1];
    };

    reader.readAsDataURL(file);
  }

  cambiarFotoPerfil(): void {
    this.fileInput.nativeElement.click();
  }
}
