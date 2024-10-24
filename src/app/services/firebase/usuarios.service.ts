import { Injectable } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  email?: string;
  nombre?: string;
  apellido?: string;
  tipo?: string;

  constructor(private firestore: AngularFirestore) { }

  obtenerUsuarioPorUid(uid: string): Observable<Usuario | undefined> {
    return this.firestore.collection<Usuario>('usuarios').doc(uid).valueChanges();
  }

  obtenerUsuarioPorEmail(email: string): Observable<Usuario | undefined> {
    return this.firestore.collection<Usuario>('usuarios', ref => ref.where('email', '==', email))
      .valueChanges()
      .pipe(
        map(usuarios => usuarios[0])
      );
  }
  addUsuario(usuario: Usuario) {
    return this.firestore.collection('usuarios').add(usuario);
  }

  deleteUsuario(id: string) {
    return this.firestore.collection('usuarios').doc(id).delete();
  }

  updateUsuario(usuario: Usuario) {
    
  }
  
}
