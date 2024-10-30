import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PruebaQRPage } from './prueba-qr.page';

describe('PruebaQRPage', () => {
  let component: PruebaQRPage;
  let fixture: ComponentFixture<PruebaQRPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaQRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
