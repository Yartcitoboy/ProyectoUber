import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/firebase/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  usuarios: any = [];
  nombreUsuario: string = '';
  apellidoUsuario: string = '';
  emailUsuario: string = '';
  tipoUsuario: string = '';

  constructor(
    private menuController: MenuController,
    private firestore: AngularFirestore,
    private authService: AuthService,
    private router: Router,
    private navCtrl: NavController,
  ) {}

  ngOnInit() {
    this.menuController.enable(true);
    this.config();

    this.authService.isLogged().subscribe((user: any) => {
      if (user) {
        this.emailUsuario = user.email;
        this.obtenerDatosUsuario(user.uid);
        this.obtenerTipoUsuario(user.uid);
      } else {
        this.navCtrl.navigateRoot('/loguear');
      }
    });
  }

  async obtenerTipoUsuario(uid: string) {
    const doc = await this.firestore.collection('usuarios').doc(uid).get().toPromise();
    if (doc && doc.exists) {
      this.tipoUsuario = (doc.data() as { tipo: string })?.tipo;
    }
  }

  async obtenerDatosUsuario(uid: string) {
    const doc = await this.firestore.collection('usuarios').doc(uid).get().toPromise();
    if (doc && doc.exists) {
      const userData = doc.data() as { nombre?: string, apellido?: string };
      this.nombreUsuario = userData.nombre || 'Nombre desconocido';
      this.apellidoUsuario = userData.apellido || 'Apellido desconocido';
    } else {
      this.nombreUsuario = 'Usuario';
      this.apellidoUsuario = 'Desconocido';
    }
  }

  config() {
    this.firestore.collection('usuarios').valueChanges().subscribe(aux => {
      this.usuarios = aux;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  
}
