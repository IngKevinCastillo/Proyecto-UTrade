import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../Services/auth.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) {}

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
          this.toastr.success('Inicio de sesión exitoso', 'Bienvenido 👋');
          this.router.navigate(['/home']);
        } else {
          this.toastr.error('Usuario o contraseña incorrectos', 'Inténtalo de nuevo 😕');
        }
      },
      error: (err: any) => {
        this.toastr.error('Error de conexión con el servidor', 'Ups... 😓');
      }
    });
  }

  loginWithGoogle(): void {
    this.toastr.info('Login con Google aún no implementado', 'Próximamente 🔧');
  }

  loginWithFacebook(): void {
    this.toastr.info('Login con Facebook aún no implementado', 'Próximamente 🔧');
  }
}