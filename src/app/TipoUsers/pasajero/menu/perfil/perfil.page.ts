import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(
    private firestore: AngularFirestore, 
    private loadingController: LoadingController, 
    private toastController: ToastController,
    private storage: Storage,
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  async seleccionarFoto() {
    try {
      const imagen = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt
      });

      if (imagen.dataUrl) {
        const loading = await this.loadingController.create({
          message: 'Subiendo foto...'
        });
        await loading.present();

        const user = await this.authService.isLogged().pipe(first()).toPromise();
        if (!user) return;

        // Convertir dataUrl a blob
        const response = await fetch(imagen.dataUrl);
        const blob = await response.blob();

        // Subir imagen a Firebase Storage
        const filePath = `profile-photos/${user.uid}/${new Date().getTime()}.jpg`;
        const storageRef = ref(getStorage(this.app), filePath);
        const uploadTask = await uploadBytes(storageRef, blob);

        // Obtener URL de la imagen
        const downloadURL = await getDownloadURL(storageRef);

        // Actualizar URL en Firestore
        await this.firestore.collection('usuarios').doc(user.uid).update({
          foto: downloadURL
        });

        await loading.dismiss();
        this.mostrarMensaje('Foto actualizada con éxito');
      }
    } catch (error) {
      console.error('Error al subir foto:', error);
      this.mostrarMensaje('Error al actualizar la foto');
    }
  }

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

}
