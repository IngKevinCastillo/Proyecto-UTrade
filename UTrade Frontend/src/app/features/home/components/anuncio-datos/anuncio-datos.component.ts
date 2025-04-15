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

  abrirInput(): void {
    const input = document.getElementById('fileInput') as HTMLInputElement;
    input?.click();
  }

  manejarFotos(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.agregarArchivos(input.files);
      input.value = ''; 
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer?.files) {
      this.agregarArchivos(event.dataTransfer.files);
    }
  }

  agregarArchivos(fileList: FileList): void {
    const nuevosArchivos = Array.from(fileList).slice(0, 10 - this.fotos.length);
    this.fotos = [...this.fotos, ...nuevosArchivos];
    this.fotosChange.emit(this.fotos);
  }

  @Input() fotos: File[] = [];
  @Output() fotosChange = new EventEmitter<File[]>();

}
