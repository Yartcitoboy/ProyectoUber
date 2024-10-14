import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleviajeConductorPage } from './detalleviaje-conductor.page';

describe('DetalleviajeConductorPage', () => {
  let component: DetalleviajeConductorPage;
  let fixture: ComponentFixture<DetalleviajeConductorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleviajeConductorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
