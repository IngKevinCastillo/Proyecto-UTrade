import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaSoporteComponent } from './ventana-soporte.component';

describe('VentanaSoporteComponent', () => {
  let component: VentanaSoporteComponent;
  let fixture: ComponentFixture<VentanaSoporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VentanaSoporteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentanaSoporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
