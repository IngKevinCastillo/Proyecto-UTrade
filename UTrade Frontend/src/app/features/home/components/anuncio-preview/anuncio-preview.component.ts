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
  
  placeholderImages: number[] = [1, 2, 3, 4];
  
  get previewUsername(): string {
    return this.username || 'Usuario';
  }
}