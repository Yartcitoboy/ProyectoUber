import { Injectable } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  email?: string;
  nombre?: string;
  apellido?: string;
  tipo?: string;

  constructor(private firestore: AngularFirestore, private authService: AuthService) { }

  

  obtenerUsuarioPorEmail(email: string): Observable<Usuario | undefined> {
    return this.firestore.collection<Usuario>('usuarios', ref => ref.where('email', '==', email))
      .valueChanges()
      .pipe(
        map(usuarios => usuarios[0])
      );
  }
  
  // Leer usuarios
  obtenerUsuarios(): Observable<Usuario[]> {
    return this.firestore.collection('usuarios').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Usuario;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  // Actualizar usuario
  actualizarUsuario(id: string, usuario: Partial<Usuario>): Promise<void> {
    return this.firestore.collection('usuarios').doc(id).update(usuario);
  }

  // Eliminar usuario
  eliminarUsuario(id: string): Promise<void> {
    return this.firestore.collection('usuarios').doc(id).delete();
  }

  async cambiarEstadoCuenta(email: string, nuevoEstado: boolean): Promise<void> {
    const userQuery = await this.firestore.collection('usuarios', ref => ref.where('email', '==', email)).get().toPromise();
    if (!userQuery?.docs.length) {
      throw new Error('Usuario no encontrado');
    }
    const userDoc = userQuery.docs[0];
    return userDoc.ref.update({ estadoCuenta: nuevoEstado });
  }
  
}
