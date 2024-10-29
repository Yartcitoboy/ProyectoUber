import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, MenuController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/firebase/auth.service';
import Swal from 'sweetalert2';
import { MensajeService } from 'src/app/services/mensaje.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-loguear',
  templateUrl: './loguear.page.html',
  styleUrls: ['./loguear.page.scss'],
})
export class LoguearPage implements OnInit {

  loginForm: FormGroup;
  emailValue?: string = '';
  passValue?: string = '';

  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private menuController: MenuController,
    private firestore: AngularFirestore,
    private mensajeService: MensajeService,
    private fireAuth: AngularFireAuth,
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

  //RANDOMUSER API  

  async createRandomUsers() {
    try {
      console.log('Iniciando creación de usuarios...');
      
      // Obtener usuarios aleatorios
      const randomUsers = await this.getRandomUsers();
      console.log('Usuarios obtenidos de la API:', randomUsers);
      

      for (let i = 0; i < randomUsers.length; i++) {
        const randomUser = randomUsers[i];
        const userType = i < 5 ? 'conductor' : 'pasajero';
        const defaultPassword = '123456';

        try {
          console.log(`Creando usuario ${i + 1}:`, randomUser.email);
          
          // Crear usuario en Authentication
          const userCredential = await this.fireAuth.createUserWithEmailAndPassword(
            randomUser.email,
            defaultPassword
          );

          if (userCredential.user) {
            const userData = {
              uid: userCredential.user.uid,
              nombre: randomUser.name.first,
              apellido: randomUser.name.last,
              email: randomUser.email,
              tipo: userType,
              estadoCuenta: true,
              matricula: userType === 'conductor' ? `MAT${Math.floor(Math.random() * 1000)}` : null,
            };

            // Guardar en Firestore
            await this.firestore.collection('usuarios').doc(userCredential.user.uid).set(userData);
            console.log(`Usuario ${i + 1} creado exitosamente:`, userData);
            
          }
        } catch (error: any) {
          console.error(`Error al crear usuario ${i + 1}:`, error.message);
          // Continuar con el siguiente usuario si hay error
          continue;
        }
      }

      await Swal.fire({
        title: '¡Usuarios Creados!',
        text: 'Proceso completado',
        icon: 'success',
        confirmButtonText: 'OK',
        heightAuto: false
      });

    } catch (error: any) {
      console.error('Error general:', error);
      await Swal.fire({
        title: 'Error',
        text: error.message || 'Error al crear usuarios',
        icon: 'error',
        confirmButtonText: 'OK',
        heightAuto: false
      });
    }
  }

  private async getRandomUsers() {
    try {
      const response = await fetch('https://randomuser.me/api/?results=10');
      if (!response.ok) {
        throw new Error('Error al obtener usuarios de la API');
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    }
  }
  
}
