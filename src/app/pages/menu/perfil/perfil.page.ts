import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  constructor(
    private menuController: MenuController, 
    private router: Router) {}

  ngOnInit() {
    this.menuController.enable(false);
    const usuarioLogin = localStorage.getItem('usuarioLogin');
    if (!usuarioLogin) {
      this.router.navigate(['/loguear']);
    } else {
      const user = JSON.parse(usuarioLogin);
    }
  }

  cerrarSesion() {
    localStorage.removeItem('usuarioLogin');
    this.router.navigate(['/loguear']);
  }
}
