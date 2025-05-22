import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ConexionBackendService } from '../../../../Services/conexion-backend.service';

@Component({
  selector: 'app-ventana-soporte',
  templateUrl: './ventana-soporte.component.html',
  styleUrls: ['./ventana-soporte.component.css']
})
export class VentanaSoporteComponent implements OnInit {
  soporteForm!: FormGroup;
  submitted = false;
  successMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private conexionBackendService: ConexionBackendService
  ) {}

  razones: any[] = [];
  baseUrl: string = '';

  ngOnInit(): void {
    this.baseUrl = this.conexionBackendService.baseUrl;
    this.soporteForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      razon: ['', Validators.required],
      descripcion: ['', Validators.required]
    });

    this.cargarRazones();
  }

  get f() {
    return this.soporteForm.controls;
  }

  cargarRazones() {
    this.http.get<any>(`${this.baseUrl}/Razones/Listar`).subscribe({
      next: (res) => {
        if (res.estado && res.valor) {
          this.razones = res.valor;
        }
      },
      error: (err) => {
        console.error('Error al cargar razones:', err);
      }
    });
  }

  enviarSoporte(): void {
    if (this.soporteForm.invalid) {
    this.submitted = true;
    return;
  }

  const usuario = JSON.parse(localStorage.getItem('usuario')!);
  if (!usuario?.idUsuario) {
    alert('Usuario no autenticado');
    return;
  }

  const idRazon = this.soporteForm.value.razon;

  this.http.get<any>(`${this.baseUrl}/Persona/Obtener/${usuario.idUsuario}`).subscribe({
    next: (resUsuario) => {
      if (!resUsuario.estado || !resUsuario.valor) {
        alert('No se pudo obtener los datos del usuario');
        return;
      }

      const persona = resUsuario.valor;

      this.http.get<any>(`${this.baseUrl}/Razones/Buscar?id=${idRazon}`).subscribe({
        next: (resRazon) => {
          if (!resRazon.estado || !resRazon.valor) {
            alert('No se pudo obtener la razón');
            return;
          }

          const razon = resRazon.valor;

          const dto = {
          correoDestino: "diegoandresariza54@gmail.com",
          correoRespuesta: this.soporteForm.value.correo,
          asunto: razon.nombre,
          mensaje: this.soporteForm.value.descripcion,
          razon: {
            idRazon: razon.idRazon,
            nombre: razon.nombre,
            contactanos: [
              {
                id: "CT0001",
                idPersona: persona.id,
                idRazon: razon.idRazon,
                descripcion: this.soporteForm.value.descripcion
              }
            ]
          }
        };


          this.http.post<{ estado: boolean; mensaje?: string }>(`${this.baseUrl}/Contactanos/Enviar`, dto).subscribe({
            next: (res) => {
              if (res.estado) {
                alert('Correo enviado exitosamente');
                this.soporteForm.reset();
              } else {
                alert('Error al enviar: ' + res.mensaje);
              }
            },
            error: (err) => {
              console.error('Error al enviar el correo:', err);
              console.error('Detalles de validación:', err.error.errors);
              alert('Error al conectar con el servidor');
            }
          });
        }
      });
    }
  });
  }
}