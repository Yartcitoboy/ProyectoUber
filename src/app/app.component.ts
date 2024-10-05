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
        { title: 'Inicio', url: '/TipoUsers/pasajero/dashboard', icon: 'home' }, 
        { title: 'Billetera', url: '/TipoUsers/pasajero/billetera', icon: 'card' }, 
        { title: 'Historial', url: '/TipoUsers/pasajero/historial', icon: 'time' },
        { title: 'Notificaciones', url: '/TipoUsers/pasajero/notificaciones', icon: 'notifications' },
        { title: 'Ajustes', url: '/TipoUsers/pasajero/ajustes', icon: 'settings' },
        { title: 'Cerrar Sesión', url: '/loguear', icon: 'log-out' },
      ]
    } else if (this.tipoUsuario === 'conductor') {
      this.appPages = [
        { title: 'Inicio', url: '/conductor/dashboard', icon: 'home' }, 
        { title: 'Billetera', url: '/conductor-billetera', icon: 'card' }, 
        { title: 'Historial', url: '/conductor-historial', icon: 'time' },
        { title: 'Notificaciones', url: '/conductor-notificaciones', icon: 'notifications' },
        { title: 'Ajustes', url: '/conductor-ajustes', icon: 'settings' },
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
