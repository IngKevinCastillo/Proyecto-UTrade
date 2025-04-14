import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VentanaComponent } from './ventana.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon'; 
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { AnuncioDatosComponent } from '../anuncio-datos/anuncio-datos.component';
import { AnuncioPreviewComponent } from '../anuncio-preview/anuncio-preview.component';

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  template: '<div>Mock User Profile</div>'
})
class MockUserProfileComponent {
  @Input() username: string = '';
  @Input() userHandle: string = '';
  @Input() avatarUrl: string = '';
}

describe('VentanaComponent', () => {
  let component: VentanaComponent;
  let fixture: ComponentFixture<VentanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        VentanaComponent,
        AnuncioDatosComponent,
        AnuncioPreviewComponent,
        MockUserProfileComponent
      ],
      imports: [
        MatDialogModule,
        MatIconModule,    
        FormsModule,     
        MatCardModule,
        MatButtonModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => {} } },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VentanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});