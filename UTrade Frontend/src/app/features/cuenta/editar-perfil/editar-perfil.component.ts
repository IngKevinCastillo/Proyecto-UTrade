import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css'
})
export class EditarPerfilComponent implements OnInit {
  profileForm!: FormGroup;
  genderOptions = [
    { value: 'masculino', label: 'Masculino' },
    { value: 'femenino', label: 'Femenino' },
    { value: 'otro', label: 'Otro' }
  ];

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      nombres: ['Juan', [Validators.required]],
      apellidos: ['Mrd', [Validators.required]],
      genero: ['masculino', [Validators.required]],
      correo: ['vendogalletas@gmail.com', [Validators.required, Validators.email]],
      telefono: ['123456789', [Validators.required]],
      fechaNacimiento: ['1990-01-01', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log('Formulario enviado:', this.profileForm.value);
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
