import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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

  checkLogin() {
      this.authService.isLogged().subscribe(async(user)=>{
        if(user) {
          try {
            // VERIFICAMO CON LA HUELLA
            // await this.checkHuellaDigital();
    
            const usuario = await this.firestore.collection('usuarios')
            .doc(user.uid).get().toPromise();
            const userData = usuario?.data() as Usuario;
    
            if(userData) {
              if(userData.tipo === 'admin') {
                this.router.navigate(['/admin-dashboard']);
              } else if ( userData.tipo === 'pasajero') {
                this.router.navigate(['/pasajero-dashboard']);
              } else {
                this.router.navigate(['/conductor-dashboard']);
              }
            }
          } catch (error) {
            this.router.navigate(['loguear']);
          }  
        } else {
          this.router.navigate(['loguear']);
        }
      });
  }

  // async checkHuellaDigital() {
  //   try {
  //     await NativeBiometric.verifyIdentity({
  //       reason: 'Por favor, autentícate para continuar',
  //       title: 'Autentición Biométrica',
  //       subtitle: 'Usa tu huella digítal o Face ID',
  //       description: 'Coloca tu huella en el sensor para ingresar.'
  //     });
  //   } catch (error) {
  //     throw error; 
  //   }
  // }

}
