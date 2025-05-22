import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConexionBackendService } from '../../../Services/conexion-backend.service';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {
  usuario: any = {
    nombreVisible: '',
    nombreUsuario: '',
    correo: '',
    telefono: '',
  };

  mostrarCorreo = false;
  mostrarTelefono = false;

  seccionActual: string = 'seguridad'; // 'seguridad' es la vista por defecto

  cambiarSeccion(seccion: string) {
    this.seccionActual = seccion;
  }


  constructor(
    private router: Router,
    private http: HttpClient,
    private conexionBackend: ConexionBackendService
  ) {}

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario')!);
    const id = usuario?.idUsuario;

    if (id) {
      const url = `${this.conexionBackend.baseUrl}/Persona/Obtener/${id}`;
      this.http.get(url).subscribe({
        next: (res: any) => {
          if (res?.estado && res?.valor) {
            const datos = res.valor;
            this.usuario = {
              nombreVisible: `${datos.nombres} ${datos.apellidos}`,
              nombreUsuario: datos.nombreUsuario,
              correo: datos.correo,
              telefono: datos.telefono,
              fotoPerfil: datos.fotoPerfil && datos.fotoPerfil.trim() !== ''
              ? datos.fotoPerfil
              : 'icons/no-photo.webp'
            };
          }
        },
        error: (err) => {
          console.error('Error al obtener datos del usuario:', err);
        }
      });
    }
  }

  alternarCorreo() {
    this.mostrarCorreo = !this.mostrarCorreo;
  }

  alternarTelefono() {
    this.mostrarTelefono = !this.mostrarTelefono;
  }

  ocultarCorreo(correo: string | null): string {
  if (!correo || correo.trim() === '') return 'No registrado';
  const [local] = correo.split('@');
  const oculto = '*'.repeat(local.length);
  return `${oculto}@${correo.split('@')[1]}`;
  }

  ocultarTelefono(telefono: string | null): string {
    if (!telefono || telefono.trim() === '') return 'No registrado';
    const ocultos = '*'.repeat(telefono.length - 4);
    return `${ocultos}${telefono.slice(-4)}`;
  }

  editarPerfil() {
    this.router.navigate(['/mi-cuenta/editar-perfil']);
  }

  editarCampo(campo: string) {
    console.log('Editar campo:', campo);
  }

  eliminarTelefono() {
    console.log('Eliminar teléfono');
  }

  cambiarContrasena() {
    console.log('Cambiar contraseña');
  }

  deshabilitarCuenta() {
    console.log('Deshabilitar cuenta');
  }

  eliminarCuenta() {
    console.log('Eliminar cuenta');
  }
}