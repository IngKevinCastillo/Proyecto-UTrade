import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentasPageComponent } from './rentas-page.component';

describe('RentasPageComponent', () => {
  let component: RentasPageComponent;
  let fixture: ComponentFixture<RentasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RentasPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
