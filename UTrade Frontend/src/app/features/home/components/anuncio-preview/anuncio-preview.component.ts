import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService   } from 'ngx-toastr'; 
import { VentanaComponent } from '../ventana/ventana.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConexionBackendService } from '../../../../Services/conexion-backend.service';

@Component({
  selector: 'app-anuncio-preview',
  templateUrl: './anuncio-preview.component.html',
  styleUrls: ['./anuncio-preview.component.css']
})
export class AnuncioPreviewComponent {
  @Input() username: string = '';
  @Input() userHandle: string = '';
  @Input() userAvatar: string = '';
  @Input() title: string = '';
  @Input() price: string = '';
  @Input() category: string = '';
  @Input() description: string = '';
  @Input() fotos: File[] = [];

  constructor(
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<VentanaComponent>,
    private router: Router,
    private http: HttpClient,
    private conexionBackend: ConexionBackendService,
    @Inject(MAT_DIALOG_DATA) public datos: any) { }
  
    ngOnInit(): void {
      const usuario = JSON.parse(localStorage.getItem('usuario')!);
      const id = usuario?.idUsuario;
  
      if (id) {
        const url = `${this.conexionBackend.baseUrl}/Persona/Obtener/${id}`;
  
        this.http.get(url).subscribe({
          next: (res: any) => {
            if (res?.estado && res?.valor) {
              const datos = res.valor;
              this.username = `${datos.nombres} ${datos.apellidos}`;
              this.userHandle = `@${datos.nombreUsuario}`;
              if (
                datos.fotoPerfilBase64 &&
                datos.fotoPerfilBase64.trim() !== ''
              ) {
                this.userAvatar =
                  'data:image/jpeg;base64,' + datos.fotoPerfilBase64;
              } else {
                this.userAvatar = 'icons/no-photo.webp';
              }
            }
          },
          error: (err) => {
            console.error('Error al obtener datos del usuario:', err);
          },
        });
      }
    }
  
  get previewUrls(): string[] {
    return ( this.fotos.slice(0, 4))
      .map(file => URL.createObjectURL(file));
  }
  
  get previewUsername(): string {
    return this.username || 'Usuario';
  }

  publicar(): void {
    this.toastr.success('Anuncio <b>publicado</b> con éxito', 'Éxito');
    this.dialogRef.close();
  }
}