import { Component } from '@angular/core';
import { Page } from './interfaces/page';
import { NavController } from '@ionic/angular';
import { AuthService } from './services/firebase/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages: Page[] = [];
  public tipoUsuario?: string;
  public emailUsuario?: string;

  constructor(private navCtrl: NavController, private authService: AuthService, private firestore: AngularFirestore) {}

  

  ngOnInit() {
    this.authService.isLogged().subscribe((user: any) => { 
      if (user) {
        this.emailUsuario = user.email;
        this.obtenerTipoUsuario(user.uid);
      } else {
        this.navCtrl.navigateRoot('/loguear');
      }
    });
  }

  async obtenerTipoUsuario(uid: string) {
    this.firestore.collection('usuarios').doc(uid).get().toPromise()
      .then((doc) => {
        if (doc && doc.exists) {
          this.tipoUsuario = (doc.data() as { tipo: string })?.tipo;
          this.configSideMenu();
        }
      });
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
        { title: 'Inicio', url: '/pasajero/dashboard', icon: 'home' }, 
        { title: 'Billetera', url: '/pasajero/billetera', icon: 'card' }, 
        { title: 'Historial', url: '/pasajero/historial', icon: 'time' },
        { title: 'Notificaciones', url: '/pasajero/notificaciones', icon: 'notifications' },
        { title: 'Ajustes', url: '/pasajero/ajustes', icon: 'settings' },
        { title: 'Cerrar Sesión', url: '/loguear', icon: 'log-out' },
      ]
    } else if (this.tipoUsuario === 'conductor') {
      this.appPages = [
        { title: 'Inicio', url: '/conductor/dashboard', icon: 'home' }, 
        { title: 'Perfil', url: '/conductor-perfil', icon: 'people' }, 
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
