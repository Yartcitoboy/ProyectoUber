import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth) { }

  loguear(email: string, pass: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email,pass);
  }

  registro(email: string, pass: string) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email,pass);
  }

  logout() {
    return this.angularFireAuth.signOut();
  }

  recoveryPassword(email: string) {
    return this.angularFireAuth.sendPasswordResetEmail(email)
    .then(() => {
      console.log('Correo enviado!');
    })
    .catch((error) => {
      console.log('Error al enviar el correo!');
      throw error;
    });
  }
}
