import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScreenplashPage } from './screenplash.page';

describe('ScreenplashPage', () => {
  let component: ScreenplashPage;
  let fixture: ComponentFixture<ScreenplashPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenplashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
