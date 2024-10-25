import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from 'src/app/services/firebase/usuarios.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-admin',
  templateUrl: './detalle-admin.page.html',
  styleUrls: ['./detalle-admin.page.scss'],
})
export class DetalleAdminPage implements OnInit {

  userEmail?: string | null;
  usuario?: Usuario;
  userTipo?: string | null;
  nombreUsuario?: string | null;
  apellidoUsuario?: string | null;  

  usuarios: any = [];
  usuarioEditado: any = {};
  constructor(
    private activatedRouter: ActivatedRoute,
    private usuarioService: UsuariosService,
    private firestore: AngularFirestore,
    private alertController: AlertController,
  ) { }

  
  ngOnInit() {
    console.log('ngOnInit iniciado');
    this.userEmail = this.activatedRouter.snapshot.paramMap.get('email');
    console.log('Email obtenido:', this.userEmail);
    
    if (this.userEmail) {
      console.log('Intentando obtener usuario con email:', this.userEmail);
      this.usuarioService.obtenerUsuarioPorEmail(this.userEmail).subscribe(
        (usuario: Usuario | undefined) => {
          console.log('Usuario obtenido:', usuario);
          this.usuario = usuario;
          if (this.usuario) {
            this.userTipo = this.usuario.tipo;
            console.log('Tipo de usuario:', this.userTipo);
          } else {
            console.log('Usuario no encontrado');
          }
        },
        (error) => {
          console.error('Error al obtener usuario:', error);
        }
      );
    } else {
      console.log('No se proporcionó email');
    }
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

  async editarUsuario(usuario: any) {
    this.usuarioEditado = { ...usuario }; // Copiar los datos del usuario a editar
    const alert = await this.alertController.create({
      header: 'Editar Usuario',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre',
          value: this.usuarioEditado.nombre,
        },
        {
          name: 'apellido',
          type: 'text',
          placeholder: 'Apellido',
          value: this.usuarioEditado.apellido,
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Guardar',
          handler: (data) => {
            this.guardarCambios(data);
          },
        },
      ],
    });

    await alert.present();
  }

  async guardarCambios(data: any) {
    const usuarioRef = this.firestore.collection('usuarios').doc(this.usuarioEditado.id);
    await usuarioRef.update({
      nombre: data.nombre,
      apellido: data.apellido,
    });
    this.config(); // Actualizar la lista de usuarios
  }

  async desactivarUsuario(email: string) {
  const usuarioRef = this.firestore.collection('usuarios', ref => ref.where('email', '==', email));
  const querySnapshot = await usuarioRef.get().toPromise();
  if (querySnapshot && querySnapshot.docs.length > 0) {
    const doc = querySnapshot.docs[0];
    await doc.ref.update({ activo: false });
  }
}

async reactivarUsuario(email: string) {
  const usuarioRef = this.firestore.collection('usuarios', ref => ref.where('email', '==', email));
  const querySnapshot = await usuarioRef.get().toPromise();
  if (querySnapshot && querySnapshot.docs.length > 0) {
    const doc = querySnapshot.docs[0];
    await doc.ref.update({ activo: true });
  }
}

  verUsuario(usuario: any) {
    console.log('Ver Usuario:', usuario);
  }
  config() {
    this.firestore.collection('usuarios').valueChanges().subscribe(aux => {
      this.usuarios = aux;
    });
  }

  async toggleUsuarioActivo(email: string, activo: boolean) {
    // Implementa la lógica para activar/desactivar el usuario
  }

}
