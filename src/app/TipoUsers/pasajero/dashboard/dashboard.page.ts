import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { person, time, home } from 'ionicons/icons';
import { Page } from 'src/app/interfaces/page';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  selectedSegment: string = 'default';

  public appPages: Page[] = [];
  public tipoUsuario?: string;
  public emailUsuario?: string;


  constructor(
    private menuController: MenuController
  ) { 
    addIcons({ person, time, home})
  }

  ngOnInit() {
    this.menuController.enable(false);
    const usuarioLogin = localStorage.getItem('usuarioLogin');
    if (usuarioLogin) {
      const user = JSON.parse(usuarioLogin);
      this.tipoUsuario = user.tipo;
      this.emailUsuario = user.email;
      this.configSideMenu();
    } else {
      
    }
  }

  configSideMenu() {
    if (this.tipoUsuario === 'admin') {
      this.appPages = [
        {title: 'Dashboard', url:'/admin-dashboard',icon:'home'},
        {title: 'Administrar Usuarios', url:'/admin-users',icon:'people'},
        {title: 'Cerrar Sesión', url:'/loguear',icon:'log-out'},
      ]
    } else if (this.tipoUsuario === 'pasajero') {
      this.appPages = [
        {title: 'Dashboard', url:'/TipoUsers/pasajero-dashboard',icon:'home'},
        {title: 'Perfil', url:'/perfil',icon:'settings'},
        {title: 'Cerrar Sesión', url:'/loguear',icon:'log-out'},
      ]
    } else if (this.tipoUsuario === 'conductor') {
      this.appPages = [
        {title: 'Dashboard', url:'/TipoUsers/conductor-dashboard',icon:'home'},
        {title: 'Perfil', url:'/perfil',icon:'settings'},
        {title: 'Cerrar Sesión', url:'/loguear',icon:'log-out'},
      ]
    } else {
      this.appPages = [
        {title: 'Login', url:'/loguear',icon:'log-out'},
        {title: 'Registrarse', url:'/registro',icon:'log-out'},
      ]
    }
  }

}