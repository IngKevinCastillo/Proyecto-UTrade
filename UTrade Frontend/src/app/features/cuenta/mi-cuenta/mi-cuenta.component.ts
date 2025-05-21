import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent {
  constructor(private router: Router) {}
  usuario = {
    nombreVisible: 'Juan mrd',
    nombreUsuario: 'JuanMrd',
    correo: '******************@gmail.com',
    telefono: '********5713'
  };

  mostrarCorreo = false;
  mostrarTelefono = false;

  alternarCorreo() {
    this.mostrarCorreo = !this.mostrarCorreo;
  }

  alternarTelefono() {
    this.mostrarTelefono = !this.mostrarTelefono;
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
