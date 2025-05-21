import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ventana-soporte',
  templateUrl: './ventana-soporte.component.html',
  styleUrl: './ventana-soporte.component.css'
})
export class VentanaSoporteComponent {
  soporteForm!: FormGroup;
  submitted = false;
  successMessage = '';
  
  razones = [
    'Problemas con la plataforma',
    'Error en la cuenta',
    'Problemas con el servicio',
    'Solicitud de información',
    'Otra'
  ];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.soporteForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      razon: ['', Validators.required],
      otraRazon: [''],
      descripcion: ['', Validators.required]
    });
  }

  get f() { return this.soporteForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.soporteForm.invalid) {
      return;
    }

    console.log('Datos de soporte', this.soporteForm.value);
    
    this.successMessage = '¡Tu mensaje ha sido enviado correctamente! Te contactaremos pronto.';
    
    this.soporteForm.reset();
    this.submitted = false;
    
    setTimeout(() => {
      this.successMessage = '';
    }, 5000);
  }

  mostrarOtraRazon() {
    return this.f['razon'].value === 'Otra';
  }
}
