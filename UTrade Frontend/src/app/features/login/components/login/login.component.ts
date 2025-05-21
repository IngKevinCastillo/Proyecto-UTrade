import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  errorMessage: string = '';
  showPassword: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    console.log('LoginComponent initialized');
  }

  login(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Debes ingresar usuario y contraseña';
      return;
    }

    interface LoginResponse {
      estado: boolean;
      valor: {
        idUsuario?: number;
        [key: string]: any;
      };
    }

    this.authService.login(this.username, this.password).subscribe({
      next: (res: LoginResponse) => {
        if (res.estado && res.valor.idUsuario) {
          localStorage.setItem('usuario', JSON.stringify(res.valor));
          
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        }
      },
      error: (err: any) => {
        console.error('Error al conectar con el servidor:', err);
        this.errorMessage = 'Error de conexión con el servidor';
      }
    });
  }

  loginWithGoogle(): void {
    console.log('Login con Google');
  }

  loginWithFacebook(): void {
    console.log('Login con Facebook');
  }
}