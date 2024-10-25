import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, MenuController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/firebase/auth.service';
import Swal from 'sweetalert2';
import { MensajeService } from 'src/app/services/mensaje.service';
@Component({
  selector: 'app-loguear',
  templateUrl: './loguear.page.html',
  styleUrls: ['./loguear.page.scss'],
})
export class LoguearPage implements OnInit {

  loginForm: FormGroup;
  emailValue?: string ='';
  passValue?: string ='';

  constructor(
    private router: Router, 
    private loadingController: LoadingController, 
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private menuController: MenuController,
    private firestore: AngularFirestore,
    private mensajeService: MensajeService
  ) { 
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
    
  ngOnInit() {
    this.menuController.enable(false);
  }

  async login() {
    try {
      const loading = await this.loadingController.create({
        message: 'Cargando.....',
        duration: 2000
      });

      await loading.present();

      const email = this.emailValue;
      const pass = this.passValue;

      const result = await this.authService.loguear(email as string, pass as string);

      await loading.dismiss()

      if (result && result.user) {
        this.mensajeService.mostrarMensaje('Inicio de sesión exitoso');
        const userDoc = await this.firestore.collection('usuarios').doc(result.user.uid).get().toPromise();
        const userData = userDoc?.data() as Usuario;

        if (!userData || userData.estadoCuenta === false) {
          await loading.dismiss();
          await this.authService.logout();
          Swal.fire({
            icon: 'error',
            title: 'Cuenta desactivada',
            text: 'Tu cuenta ha sido desactivada. Por favor, contacta al administrador.',
            confirmButtonText: 'OK',
            heightAuto: false
          });
           // Cerrar sesión si la cuenta está desactivada
          return;
        }

        localStorage.setItem('usuarioLogin', JSON.stringify({
          email: email as string,
          tipo: userData.tipo
        }));

        await loading.dismiss();

        // Redirigir según el tipo de usuario
        switch (userData.tipo) {
          case 'admin':
            this.router.navigate(['/usuarios']);
            break;
          case 'pasajero':
            this.router.navigate(['./pasajero-dashboard']);  
            break;
          case 'conductor':
            this.router.navigate(['./conductor-dashboard']);
            break;
          default:
            console.error('Tipo de usuario no reconocido');
            break;
        }
      } else {
        await loading.dismiss();
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: 'Credenciales incorrectas. Por favor, intenta de nuevo.',
          confirmButtonText: 'OK',
          heightAuto: false
        });
      }
    } catch (error) {
      console.error('Error en login:', error);
      await this.loadingController.dismiss();

      if (error instanceof Error) {
        if (error.message === 'Cuenta desactivada') {
          await Swal.fire({
            icon: 'error',
            title: 'Cuenta desactivada',
            text: 'Tu cuenta ha sido desactivada. Por favor, contacta al administrador.',
            confirmButtonText: 'OK',
            heightAuto: false
          });
        } else {
          this.mensajeService.mostrarMensaje('Ocurrió un error inesperado. Por favor, intenta de nuevo.');
        }
      } else {
        this.mensajeService.mostrarMensaje('Ocurrió un error inesperado. Por favor, intenta de nuevo.');
      }
      console.error('Error en login:', error);
    }
  }
}
