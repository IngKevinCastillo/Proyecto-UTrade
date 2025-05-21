import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService   } from 'ngx-toastr'; 
import { VentanaComponent } from '../ventana/ventana.component';

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

  verMas: boolean = false;

  constructor(
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<VentanaComponent>,
      @Inject(MAT_DIALOG_DATA) public datos: any) {}

  get previewUrls(): string[] {
    return (this.verMas ? this.fotos.slice(0, 10) : this.fotos.slice(0, 4))
      .map(file => URL.createObjectURL(file));
  }

  toggleVerMas(): void {
    this.verMas = !this.verMas;
  }

  get previewUsername(): string {
    return this.username || 'Usuario';
  }

  publicar(): void {
    this.toastr.success('Anuncio <b>publicado</b> con éxito', 'Éxito');
    this.dialogRef.close();
  }
}