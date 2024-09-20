import { Component } from '@angular/core';
import { Page } from './interfaces/page';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages: Page[] = [];
  public tipoUsuario?: string;
  public emailUsuario?: string;

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    const usuarioLogin = localStorage.getItem('usuarioLogin');
    if (usuarioLogin) {
      const user = JSON.parse(usuarioLogin);
      this.tipoUsuario = user.tipo;
      this.emailUsuario = user.email;
      this.configSideMenu();
    } else {
      this.navCtrl.navigateRoot('/loguear');
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
        { title: 'Inicio', url: '/TipoUsers/conductor/historial', icon: 'home' }, 
        { title: 'Billetera', url: '/TipoUsers/conductor/mapa', icon: 'card' }, 
        { title: 'Historial', url: '/TipoUsers/conductor/dashboard', icon: 'time' },
        { title: 'Notificaciones', url: '/TipoUsers/conductor/perfil', icon: 'notifications' },
        { title: 'Ajustes', url: '/TipoUsers/conductor/perfil', icon: 'settings' },
        { title: 'Cerrar Sesión', url: '/loguear', icon: 'log-out' },
      ]
    } else {
      this.appPages = [
        {title: 'Login', url:'/loguear',icon:'log-out'},
        {title: 'Registrarse', url:'/registro',icon:'log-out'},
      ]
    }
  }
}
