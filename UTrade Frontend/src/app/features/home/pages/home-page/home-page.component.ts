import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VentanaComponent } from '../../components/ventana/ventana.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConexionBackendService } from '../../../../Services/conexion-backend.service';
import { ProductoService } from '../../../../Services/producto.service';
import { Publicaciones } from '../../../../interfaces/publicaciones';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  @Input() userAvatar: string = 'icons/no-photo.webp';
  mostrarTodosLosProductos: boolean = true;

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router,
    private http: HttpClient,
    private conexionBackend: ConexionBackendService,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.cargarAvatarUsuario();
  }

  private cargarAvatarUsuario(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario')!);
    const id = usuario?.idUsuario;

    if (id) {
      const url = `${this.conexionBackend.baseUrl}/Persona/Obtener/${id}`;

      this.http.get(url).subscribe({
        next: (res: any) => {
          if (res?.estado && res?.valor) {
            const datos = res.valor;
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

  crearServicio() {
    const dialogRef = this.dialog.open(VentanaComponent, {
      disableClose: true,
      autoFocus: true,
      closeOnNavigation: false,
      position: { top: '30px' },
      width: '90vw',
      maxWidth: '1200px',
      data: {
        tipo: 'CREAR'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.mostrarTodosLosProductos = false;
        setTimeout(() => {
          this.mostrarTodosLosProductos = true;
        }, 100);
      }
    });
  }

  publicar() {
    this.toastr.error('Debes crear el producto o servicio ', 'Todavia no campeón(a)');
    this.crearServicio();
  }
}