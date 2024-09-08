import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleAdminPage } from './detalle-admin.page';

describe('DetalleAdminPage', () => {
  let component: DetalleAdminPage;
  let fixture: ComponentFixture<DetalleAdminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
