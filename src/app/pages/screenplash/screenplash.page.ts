import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-screenplash',
  templateUrl: './screenplash.page.html',
  styleUrls: ['./screenplash.page.scss'],
})
export class ScreenplashPage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    this.animateAndNavigate();
  }

  async animateAndNavigate() {
    // Esperar 2 segundos para mostrar el splash
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Obtener elementos para animar
    const container = document.querySelector('.center-content');
    const logo = document.querySelector('.logo-container img');
    const spinner = document.querySelector('ion-spinner');

    // Agregar animaciones de salida
    logo?.classList.remove('animate__bounceIn');
    logo?.classList.add('animate__animated', 'animate__fadeOutUp');
    spinner?.classList.add('animate__animated', 'animate__fadeOut');
    container?.classList.remove('animate__fadeIn');
    container?.classList.add('animate__animated', 'animate__fadeOut');

    // Esperar a que termine la animación antes de navegar
    await new Promise(resolve => setTimeout(resolve, 800));

    // Navegar al login
    await this.router.navigate(['/loguear'], {
      skipLocationChange: true
    });
  }
}
