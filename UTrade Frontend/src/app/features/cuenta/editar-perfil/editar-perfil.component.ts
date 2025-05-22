import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConexionBackendService } from '../../../Services/conexion-backend.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {
  profileForm!: FormGroup;
  genderOptions = [
    { value: 'masculino', label: 'Masculino' },
    { value: 'femenino', label: 'Femenino' },
    { value: 'otro', label: 'Otro' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private conexionBackend: ConexionBackendService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      nombreUsuario: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      correo: [''],   
      telefono: [''],
      fechaNacimiento: ['', [Validators.required]]
    });

    this.profileForm.get('correo')?.valueChanges.subscribe(value => {
      const correoControl = this.profileForm.get('correo');
      if (value && value.trim() !== '') {
        correoControl?.setValidators([Validators.email]);
      } else {
        correoControl?.clearValidators();
      }
      correoControl?.updateValueAndValidity();
    });

    this.profileForm.get('telefono')?.valueChanges.subscribe(value => {
      const telefonoControl = this.profileForm.get('telefono');
      if (value && value.trim() !== '') {
        telefonoControl?.setValidators([Validators.pattern(/^\+?\d{7,15}$/)]);
      } else {
        telefonoControl?.clearValidators();
      }
      telefonoControl?.updateValueAndValidity();
    });

    this.cargarDatosUsuario();
  }

  cargarDatosUsuario(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario')!);
    const id = usuario?.idUsuario;
    if (!id) {
      this.toastr.error('¡Ups! No encontramos tu sesión activa 🤔', 'Usuario no cargado', {
        timeOut: 5000,
        progressBar: true,
      });
      return;
    }

    const url = `${this.conexionBackend.baseUrl}/Persona/Obtener/${id}`;
    this.http.get(url).subscribe({
      next: (res: any) => {
        if (res?.estado && res?.valor) {
          const datos = res.valor;
          let generoMapeado = '';
          switch (datos.genero) {
            case 'M':
              generoMapeado = 'masculino';
              break;
            case 'F':
              generoMapeado = 'femenino';
              break;
            case 'O':
              generoMapeado = 'otro';
              break;
          }

          this.profileForm.patchValue({
            nombreUsuario: datos.nombreUsuario || '',
            nombres: datos.nombres || '',
            apellidos: datos.apellidos || '',
            genero: generoMapeado,
            correo: datos.correo || '',
            telefono: datos.telefono || '',
            fechaNacimiento: datos.fechaNacimiento
              ? datos.fechaNacimiento.substring(0, 10)
              : ''
          });
          this.toastr.info('Datos cargados exitosamente 😊', '¡Bienvenido de nuevo!', {
            timeOut: 3000,
            progressBar: true,
          });
        } else {
          this.toastr.warning('Recibimos una respuesta inesperada del servidor', 'Algo raro pasó…', {
            timeOut: 5000,
            progressBar: true,
          });
        }
      },
      error: err => {
        this.toastr.error('No pudimos conectar con el servidor 😵‍💫', 'Error de red', {
          timeOut: 7000,
          progressBar: true,
        });
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const formValues = { ...this.profileForm.value };

      if ((!formValues.correo || formValues.correo.trim() === '') &&
          (!formValues.telefono || formValues.telefono.trim() === '')) {
        this.toastr.warning('Debes ingresar al menos un correo o un teléfono 📱', 'Validación', {
        timeOut: 5000,
        progressBar: true,
      });
        return;
      }

      if (formValues.correo && this.profileForm.get('correo')?.invalid) {
        this.toastr.error('Este correo no es válido. Ej: usuario@dominio.com', 'Correo inválido', {
        timeOut: 5000,
        progressBar: true,
        });
        return;
      }

      if (formValues.telefono && this.profileForm.get('telefono')?.invalid) {
        this.toastr.error('Ingresa un teléfono con 10 dígitos', 'Teléfono inválido', {
        timeOut: 5000,
        progressBar: true,
      });
        return;
      }

      let generoBackend = '';
      switch (formValues.genero) {
        case 'masculino':
          generoBackend = 'M';
          break;
        case 'femenino':
          generoBackend = 'F';
          break;
        case 'otro':
          generoBackend = 'O';
          break;
      }
      const usuario = JSON.parse(localStorage.getItem('usuario')!);
      if (!usuario) {
        this.toastr.error('No encontramos tu información de usuario 😢', 'Error interno', {
        timeOut: 5000,
        progressBar: true,
        });
        return;
      }

      const payload = {
        id: usuario.idUsuario || '',
        nombres: formValues.nombres,
        apellidos: formValues.apellidos,
        fechaNacimiento: formValues.fechaNacimiento,
        genero: generoBackend,
        idRol: usuario.idRol || '',
        nombreUsuario: formValues.nombreUsuario || '',
        contraseña: usuario.contraseña || '',
        correo: formValues.correo || null,
        telefono: formValues.telefono || null,
        fotoPerfil: null
      };

      const url = `${this.conexionBackend.baseUrl}/Persona/Editar`;

      this.http.put(url, payload).subscribe({
      next: (res: any) => {
        if (res.estado) {
          this.toastr.success('¡Listo! Tu perfil se actualizó sin problemas 💾', 'Actualización exitosa', {
            timeOut: 3000,
            progressBar: true,
          });
          this.router.navigate(['/mi-cuenta']);
        } else {
          this.toastr.error(`Algo falló: ${res.mensaje || 'mensaje desconocido'}`, 'Error al guardar', {
            timeOut: 6000,
            progressBar: true,
          });
        }
      },
      error: err => {
        this.toastr.error('Fallo de comunicación con el servidor 🌐', 'Error de conexión', {
          timeOut: 6000,
          progressBar: true,
        });
        console.error(err);
      }
    });


    } else {
      this.markFormGroupTouched(this.profileForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/mi-cuenta']);
  }
}