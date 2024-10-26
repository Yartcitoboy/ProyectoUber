import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from 'src/app/services/firebase/usuarios.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-detalle-admin',
  templateUrl: './detalle-admin.page.html',
  styleUrls: ['./detalle-admin.page.scss'],
})
export class DetalleAdminPage implements OnInit {

  uid?: string | null;
  usuario?: Usuario | null;
  nombreUsuario?: string | null;
  apellidoUsuario?: string | null;  
  userEmail?: string | null;
  password?: string | null;
  userTipo?: string | null;

  usuarios: any = [];
  usuarioEditado: any = {};
  constructor(
    private activatedRouter: ActivatedRoute,
    private usuarioService: UsuariosService,
    private firestore: AngularFirestore,
    private alertController: AlertController,
    private userService: UsuariosService,
    private router: Router
  ) { }

  
  ngOnInit() {
    this.uid = this.activatedRouter.snapshot.paramMap.get('uid');
    if (this.uid) {
      this.cargarUsuario(this.uid);
    }
  }

  editarUsuario(uid: string) {
    this.router.navigate(['/edit-user', uid]);
  }

  cargarUsuario(email: string) {
    this.usuarioService.obtenerUsuarioPorEmail(email).subscribe(
      (usuario: Usuario | undefined) => {
        if (usuario) {
          this.usuario = usuario;
          // Asegurarse de que activo tenga un valor booleano por defecto
          this.usuario.estadoCuenta = usuario.estadoCuenta ?? true;
        } else {
          console.log('Usuario no encontrado');
        }
      },
      (error) => {
        console.error('Error al obtener usuario:', error);
      }
    );
  }

///////////////////

async obtenerTipoUsuario(uid: string) {
  const doc = await this.firestore.collection('usuarios').doc(uid).get().toPromise();
  if (doc && doc.exists) {
    this.userTipo = (doc.data() as { tipo: string })?.tipo;
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

  async eliminarUsuario(email: string) {
    const usuarioRef = this.firestore.collection('usuarios', ref => ref.where('email', '==', email));
    const querySnapshot = await usuarioRef.get().toPromise();
    if (querySnapshot && querySnapshot.docs.length > 0) {
      const doc = querySnapshot.docs[0];
      await doc.ref.delete();
      this.config(); // Actualizar la lista de usuarios
    }
  }

  

  async desactivarUsuario(email: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar desactivación',
      message: '¿Está seguro que desea desactivar este usuario? No podrá ingresar a la aplicación hasta que sea reactivado.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Desactivar',
          handler: async () => {
            const usuarioRef = this.firestore.collection('usuarios', ref => ref.where('email', '==', email));
            const querySnapshot = await usuarioRef.get().toPromise();
            if (querySnapshot && querySnapshot.docs.length > 0) {
              const doc = querySnapshot.docs[0];
              await doc.ref.update({ estadoCuenta: false });
              console.log('Usuario desactivado');
              this.config(); // Actualizar la lista de usuarios
            }
          }
        }
      ]
    });
    await alert.present();
  }
  
  async reactivarUsuario(email: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar reactivación',
      message: '¿Está seguro que desea reactivar este usuario? Podrá ingresar nuevamente a la aplicación.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Reactivar',
          handler: async () => {
            const usuarioRef = this.firestore.collection('usuarios', ref => ref.where('email', '==', email));
            const querySnapshot = await usuarioRef.get().toPromise();
            if (querySnapshot && querySnapshot.docs.length > 0) {
              const doc = querySnapshot.docs[0];
              await doc.ref.update({ estadoCuenta: true });
              console.log('Usuario reactivado');
              this.config(); // Actualizar la lista de usuarios
            }
          }
        }
      ]
    });
    await alert.present();
  }

  // verUsuario(usuario: any) {
  //   console.log('Ver Usuario:', usuario);
  // }
  config() {
    this.firestore.collection('usuarios').valueChanges().subscribe(aux => {
      this.usuarios = aux;
    });
  }

  async toggleUsuarioActivo(email: string, nuevoEstado: boolean) {
    try {
      await this.usuarioService.cambiarEstadoCuenta(email, nuevoEstado);
      Swal.fire({
        icon: 'success',
        title: 'Estado de cuenta actualizado',
        text: `La cuenta ha sido ${nuevoEstado ? 'activada' : 'desactivada'} exitosamente.`,
        confirmButtonText: 'OK',
        heightAuto: false
      });
    } catch (error) {
      console.error('Error al cambiar el estado de la cuenta:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar el estado de la cuenta. Por favor, intenta de nuevo.',
        confirmButtonText: 'OK',
        heightAuto: false
      });
    }
  }
}
