import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-anuncio-datos',
  templateUrl: './anuncio-datos.component.html',
  styleUrls: ['./anuncio-datos.component.css']
})
export class AnuncioDatosComponent {
  @Input() username: string = 'Juan mrd';
  @Input() userHandle: string = '@vendogalletas';
  @Input() userAvatar: string = 'icons/oceana.png';
  
  @Input() title: string = '';
  @Input() price: string = '';
  @Input() category: string = '';
  @Input() description: string = '';
  
  @Output() titleChange = new EventEmitter<string>();
  @Output() priceChange = new EventEmitter<string>();
  @Output() categoryChange = new EventEmitter<string>();
  @Output() descriptionChange = new EventEmitter<string>();
  @Output() closeClicked = new EventEmitter<void>();
  @Output() addPhotosClicked = new EventEmitter<void>();
  
  onTitleChange(value: string): void {
    this.title = value;
    this.titleChange.emit(value);
  }
  
  onPriceChange(value: string): void {
    this.price = value;
    this.priceChange.emit(value);
  }
  
  onCategoryChange(value: string): void {
    this.category = value;
    this.categoryChange.emit(value);
  }
  
  onDescriptionChange(value: string): void {
    this.description = value;
    this.descriptionChange.emit(value);
  }
  
  salir(): void {
    this.closeClicked.emit();
  }
  
  agregarFotos(): void {
    this.addPhotosClicked.emit();
  }
}
