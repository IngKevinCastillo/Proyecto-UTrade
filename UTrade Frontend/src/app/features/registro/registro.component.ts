import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
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
    termsAccepted: false
  };

  showPassword = false;
  showConfirmPassword = false;
  errorMessage = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  registerWithGoogle(): void {
    // Implementar lógica de registro con Google
    console.log('Registro con Google');
  }

  registerWithFacebook(): void {
    // Implementar lógica de registro con Facebook
    console.log('Registro con Facebook');
  }

  registro(): void {
    // Validación básica
    if (!this.validateForm()) {
      return;
    }

    // Aquí iría la lógica de registro con el backend (O eso imagino yo)
    console.log('Datos de registro:', this.registroData);
    
    // Simulación de registro exitoso
    setTimeout(() => {
      // Redirigir al usuario a la página de inicio de sesión o dashboard
      this.router.navigate(['/login']);
    }, 1000);
  }


  private validateForm(): boolean {

    // Validación básica de email (puedes hacerla más robusta)
    const emailOrPhone = this.registroData.email?.trim(); // Elimina espacios alrededor

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
      this.errorMessage = 'Ingresa un correo electrónico o número telefónico válido';
      return false;
    }

    // Validar que todos los campos requeridos estén completos (excepto confirmar contraseña)
    if (!this.registroData.nombres || 
      !this.registroData.apellidos || 
      !this.registroData.email || 
      !this.registroData.fechaNacimiento || 
      !this.registroData.genero || 
      !this.registroData.password) {
      this.errorMessage = 'Por favor completa todos los campos';
      return false;
    }

    // Validar que la contraseña y la confirmación de contraseña sean iguales
    if (this.registroData.password !== this.registroData.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return false;
    }

    // Validar que se hayan aceptado los términos y condiciones
    if (!this.registroData.termsAccepted) {
      this.errorMessage = 'Debes aceptar los términos y condiciones para continuar';
      return false;
    }

    // Verificar que la contraseña tenga al menos 8 caracteres
    if (this.registroData.password.length < 8) {
      this.errorMessage = 'La contraseña debe tener al menos 8 caracteres';
      return false;
    }

    this.errorMessage = '';
    return true;
  }
}