import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoViajePage } from './info-viaje.page';

describe('InfoViajePage', () => {
  let component: InfoViajePage;
  let fixture: ComponentFixture<InfoViajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
