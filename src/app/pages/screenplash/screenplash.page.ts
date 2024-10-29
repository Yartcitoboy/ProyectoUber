import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { NativeBiometric } from 'capacitor-native-biometric';
import { AuthService } from 'src/app/services/firebase/auth.service';

@Component({
  selector: 'app-screenplash',
  templateUrl: './screenplash.page.html',
  styleUrls: ['./screenplash.page.scss'],
})
export class ScreenplashPage implements OnInit {

  constructor(private router: Router, private authService: AuthService, private firestore: AngularFirestore) { }

  ngOnInit() {
    setTimeout(() => {
      this.checkLogin();
    }, 2000);
  }

  async checkLogin() {
    this.authService.isLogged().subscribe(async (user) => {
      if (!user) {
        this.router.navigate(['loguear']);
        return;
      }

      try {
        const userDoc = await this.firestore
          .collection('usuarios')
          .doc(user.uid)
          .get()
          .toPromise();

        const userData = userDoc?.data() as any;

        if (!userData) {
          this.router.navigate(['loguear']);
          return;
        }

        switch (userData.tipo) {
          case 'admin':
            this.router.navigate(['/admin-dashboard']);
            break;
          case 'pasajero':
            this.router.navigate(['/pasajero-dashboard']);
            break;
          case 'conductor':
            this.router.navigate(['/conductor-dashboard']);
            break;
          default:
            this.router.navigate(['loguear']);
        }
      } catch (error) {
        console.error('Error al verificar usuario:', error);
        this.router.navigate(['loguear']);
      }
    });
  }

  async checkHuellaDigital() {
    try {
      await NativeBiometric.verifyIdentity({
        reason: 'Por favor, autentícate para continuar',
        title: 'Autentición Biométrica',
        subtitle: 'Usa tu huella digítal o Face ID',
        description: 'Coloca tu huella en el sensor para ingresar.'
      });
    } catch (error) {
      throw error; 
    }
  }

}
