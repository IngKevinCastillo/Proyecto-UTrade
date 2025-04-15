import { Component, Input } from '@angular/core';

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
}
