import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ConexionBackendService } from '../../../../Services/conexion-backend.service';
import { ToastrService } from 'ngx-toastr';

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
    private conexionBackendService: ConexionBackendService,
    private toastr: ToastrService
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
        this.toastr.error('🚨 Error al cargar las razones. Por favor, intenta nuevamente más tarde. 😞', 'Error');
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
      this.toastr.warning('🔒 Usuario no autenticado. Por favor, inicia sesión primero. ⚠️', 'Advertencia');
      return;
    }

    const idRazon = this.soporteForm.value.razon;

    this.http.get<any>(`${this.baseUrl}/Persona/Obtener/${usuario.idUsuario}`).subscribe({
      next: (resUsuario) => {
        if (!resUsuario.estado || !resUsuario.valor) {
        this.toastr.error('😞 No se pudo obtener los datos del usuario. Por favor, verifica tu sesión. ❌', 'Error');
          return;
        }

        const persona = resUsuario.valor;

        this.http.get<any>(`${this.baseUrl}/Razones/Buscar?id=${idRazon}`).subscribe({
          next: (resRazon) => {
            if (!resRazon.estado || !resRazon.valor) {
              this.toastr.error('🚫 No se pudo obtener la razón seleccionada. Por favor, intenta nuevamente. ❌', 'Error');
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
                  this.toastr.success('✅ ¡Correo enviado exitosamente! 🎉 Pronto nos pondremos en contacto contigo.', 'Éxito');
                  this.soporteForm.reset();
                } else {
                  this.toastr.error(`❌ ¡Ups! Hubo un error al enviar: ${res.mensaje} 😥`, 'Error');
                }
              },
              error: (err) => {
                this.toastr.error('📧❌ Error al enviar el correo. Por favor, revisa los datos e intenta nuevamente. 😥', 'Error');
                this.toastr.error('🌐🔌 Error de conexión con el servidor. Verifica tu internet. ⚠️', 'Error de Red');
              }
            });
          }
        });
      }
    });
  }
}