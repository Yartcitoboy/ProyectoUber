import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedirViajePage } from './pedir-viaje.page';

describe('PedirViajePage', () => {
  let component: PedirViajePage;
  let fixture: ComponentFixture<PedirViajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PedirViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
