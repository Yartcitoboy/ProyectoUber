import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallePasajeroPage } from './detalle-pasajero.page';

describe('DetallePasajeroPage', () => {
  let component: DetallePasajeroPage;
  let fixture: ComponentFixture<DetallePasajeroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePasajeroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
