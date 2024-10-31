import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private firestore: AngularFirestore,

  ) {
  }

  
  async loguear(email: string, password: string) {
    try {
      const result = await this.angularFireAuth.signInWithEmailAndPassword(email, password);
      // Verificar si la cuenta está desactivada
      const userDoc = await this.firestore.collection('usuarios').doc(result.user?.uid).get().toPromise();
      const userData = userDoc?.data() as Usuario;
      if (userData && userData.estadoCuenta === false) {
        await this.logout(); 
        throw new Error('Cuenta desactivada');
      }
      return result;
    } catch (error) {
      throw error; 
    }
  }

  isLogged(): Observable<any> {
    return this.angularFireAuth.authState;
  }

  registro(email: string, pass: string) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email,pass);
  }

  async logout() {
    try {
      await this.angularFireAuth.signOut();
    } catch (error) {
      console.error('Error en logout:', error);
      throw error;
    }
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
  getCurrentUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      const user = this.angularFireAuth.currentUser;
      if (user) {
        resolve(user);
      } else {
        reject('No hay usuario autenticado');
      }
    });
  }
  

  obtenerInfoUsuario(userId: string) {
    return this.firestore.collection('usuarios').doc(userId).valueChanges();
  }

}
