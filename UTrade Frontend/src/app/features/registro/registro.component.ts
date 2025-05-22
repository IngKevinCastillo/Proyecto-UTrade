import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  registroData = {
    nombres: '',
    apellidos: '',
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

  constructor(private router: Router) {}

  ngOnInit(): void {}

  registerWithGoogle(): void {
    console.log('Registro con Google');
  }

  registerWithFacebook(): void {
    console.log('Registro con Facebook');
  }

  registro(): void {
    if (!this.validateForm()) {
      return;
    }
    console.log('Datos de registro:', this.registroData);
  }

  private validateForm(): boolean {
    const emailOrPhone = this.registroData.email?.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
      this.errorMessage =
        'Ingresa un correo electrónico o número telefónico válido';
      return false;
    }

    if (
      !this.registroData.nombres ||
      !this.registroData.apellidos ||
      !this.registroData.email ||
      !this.registroData.fechaNacimiento ||
      !this.registroData.genero ||
      !this.registroData.password
    ) {
      this.errorMessage = 'Por favor completa todos los campos';
      return false;
    }

    if (this.registroData.password !== this.registroData.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return false;
    }

    if (!this.registroData.termsAccepted) {
      this.errorMessage =
        'Debes aceptar los términos y condiciones para continuar';
      return false;
    }

    if (this.registroData.password.length < 8) {
      this.errorMessage = 'La contraseña debe tener al menos 8 caracteres';
      return false;
    }

    this.errorMessage = '';
    return true;
  }
}
