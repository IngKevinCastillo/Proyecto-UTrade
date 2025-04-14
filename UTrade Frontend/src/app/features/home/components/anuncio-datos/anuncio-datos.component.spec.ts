import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnuncioDatosComponent } from './anuncio-datos.component';

describe('AnuncioDatosComponent', () => {
  let component: AnuncioDatosComponent;
  let fixture: ComponentFixture<AnuncioDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnuncioDatosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnuncioDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
