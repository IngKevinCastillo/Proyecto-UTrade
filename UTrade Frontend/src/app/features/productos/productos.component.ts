import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { productosLista, Productos, MiPublicacion, convertirProductoAPublicacion } from '../simulacionProductos';
import { MatDialog } from '@angular/material/dialog';
import { VentanaReportesComponent } from './componentes/ventana-reportes/ventana-reportes.component';
import { VerProductosComponent } from './componentes/ver-productos/ver-productos.component';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Persona } from '../../interfaces/persona';
import { CategoriaPublicacion } from '../../interfaces/categoria-publicacion';
import { UsuarioService } from '../../Services/usuario.service';
import { CategoriaPublicacionService } from '../../Services/categoria-publicacion.service';
import { PersonaServiceService } from '../../Services/persona.service';
import { Publicaciones } from '../../interfaces/publicaciones';


interface ProductoExtendido extends Productos {
  verMas: boolean;
  publicacion?: MiPublicacion;
}

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnChanges, OnInit {

  formularioPublicaciones: FormGroup;
  listaDePersonas: Persona[];
  datosPublicaciones: Publicaciones

  @Input() Filtro?: string;
  @Input() FiltroLista?: Productos[];
  
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private _categoriaServicio: CategoriaPublicacionService,
    private _personaServicio: PersonaServiceService,
    private listaPersonas: Persona[]
  ) { 
    this.listaDePersonas = listaPersonas;
    this.formularioPublicaciones = this.fb.group({
      id: ["", Validators.required],
      titulo: ["", Validators.required],
      fechaPublicacion: ["", Validators.required],
      idUsuario: ["", Validators.required],
      precio: ["", Validators.required],
      idCategoria: ["", Validators.required],
      descripcion: ["", Validators.required],
      ubicacion: [""],
      idReseña: [""]
    });

    this._categoriaServicio.lista().subscribe({
      next: (respuesta) => {
        if(respuesta.estado) this.productos = respuesta.valor
      },
      error:(e) => {}
    })

    this._personaServicio.listar().subscribe({
      next: (respuesta) => {
        if(respuesta.estado) this.listaDePersonas = respuesta.valor
      },
      error:(e) => {}
    })

  }

  productos: ProductoExtendido[] = [];

  ngOnInit(): void {
    if (this.datosPublicaciones != null) {
      this.formularioPublicaciones.patchValue({
        id: this.datosPublicaciones.id,
        titulo: this.datosPublicaciones.titulo,
        fechaPublicacion: this.datosPublicaciones.fechaPublicacion,
        idUsuario: this.datosPublicaciones.idUsuario,
        precio: this.datosPublicaciones.precio,
        idCategoria: this.datosPublicaciones.idCategoria,
        descripcion: this.datosPublicaciones.descripcion,
        ubicacion: this.datosPublicaciones.ubicacion,
        idReseña: this.datosPublicaciones.idReseña
      })
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['FiltroLista'] && this.FiltroLista) {
      this.productos = this.FiltroLista.map(producto => ({
        ...producto,
        verMas: false,
        publicacion: convertirProductoAPublicacion(producto)
      }));
    }
    else if (changes['Filtro'] && this.Filtro) {
      const filtrados = productosLista.filter(producto => producto.category === this.Filtro);
      this.productos = filtrados.map(producto => ({
        ...producto,
        verMas: false,
        publicacion: convertirProductoAPublicacion(producto)
      }));
    }
  }

  reportarProducto(): void {
    const dialogRef = this.dialog.open(VentanaReportesComponent, {
      disableClose: false,
      autoFocus: true,
      closeOnNavigation: true,
      panelClass: 'modal-reporte-personalizado',
      width: '650px',
      maxWidth: '95%',
      data: {
        tipo: 'CREAR',
        tipoObjeto: 'publicacion'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Reporte enviado:', result);
      } else {
        console.log('Diálogo cerrado sin enviar reporte');
      }
    });
  }

  toggleVerMas(producto: ProductoExtendido): void {
    producto.verMas = !producto.verMas;
    if (producto.publicacion) {
      this.verDetalles(producto.publicacion);
    }
  }

  getPreviewUrls(fotos: string[], verMas: boolean): string[] {
    return verMas ? fotos : fotos.slice(0, 3);
  }

  verDetalles(publicacion: MiPublicacion): void {
    publicacion: publicacion;
    const dialogRef = this.dialog.open(VerProductosComponent, {
      disableClose: true,
      autoFocus: true,
      closeOnNavigation: false,
      position: { top: '30px' },
      width: '90vw',
      maxWidth: '1000px',
      data: {
        tipo: 'VER_DETALLE',
        publicacion: publicacion
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      const producto = this.productos.find(p => p.publicacion?.id === publicacion.id);
      if (producto) {
        producto.verMas = false;
      }
      console.log(`Dialog result: ${result}`);
    });
  }
}