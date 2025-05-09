import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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


  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log('LoginComponent initialized');
  }

  login(): void {
    if (this.username === 'admin' && this.password === '123') {
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos';
    }
  }

  loginWithGoogle(): void {
    console.log('Login con Google');
  }

  loginWithFacebook(): void {
    console.log('Login con Facebook');
  }
}