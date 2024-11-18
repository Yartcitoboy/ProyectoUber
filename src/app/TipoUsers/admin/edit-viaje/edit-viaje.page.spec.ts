import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditViajePage } from './edit-viaje.page';

describe('EditViajePage', () => {
  let component: EditViajePage;
  let fixture: ComponentFixture<EditViajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
