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
          
          return;
        }

        localStorage.setItem('usuarioLogin', JSON.stringify({
          email: email as string,
          tipo: userData.tipo
        }));

        await loading.dismiss();

        
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
      
      const randomUsers = await this.getRandomUsers();
      console.log('Usuarios obtenidos de la API:', randomUsers);
      
      const totalUsers = randomUsers.length;
      const halfUsers = Math.floor(totalUsers / 2);
      let usersCreated = [];  // Array para almacenar la información

      for (let i = 0; i < randomUsers.length; i++) {
        const randomUser = randomUsers[i];
        const userType = i < halfUsers ? 'conductor' : 'pasajero';
        const defaultPassword = '123456';
        const customEmail = `${randomUser.name.first}.${randomUser.name.last}@${userType}.cl`.toLowerCase();

        try {
          console.log(`Creando usuario ${i + 1}:`, customEmail);
          
          const userCredential = await this.fireAuth.createUserWithEmailAndPassword(
            customEmail,
            defaultPassword
          );

          if (userCredential.user) {
            const userData = {
              uid: userCredential.user.uid,
              nombre: randomUser.name.first,
              apellido: randomUser.name.last,
              email: customEmail,
              password: defaultPassword,  // Agregamos la contraseña
              tipo: userType,
              estadoCuenta: true,
              matricula: userType === 'conductor' ? `MAT${Math.floor(Math.random() * 1000)}` : null,
            };

            await this.firestore.collection('usuarios').doc(userCredential.user.uid).set(userData);
            usersCreated.push(userData);  // Guardamos la información del usuario
            console.log(`Usuario ${i + 1} creado exitosamente:`, userData);
          }
        } catch (error: any) {
          console.error(`Error al crear usuario ${i + 1}:`, error.message);
          continue;
        }
      }

      // Mostramos la información de todos los usuarios creados
      await Swal.fire({
        title: '¡Usuarios Creados!',
        html: `
          <div style="text-align: left">
            ${usersCreated.map(user => `
              <p><strong>Email:</strong> ${user.email}<br>
              <strong>Contraseña:</strong> ${user.password}<br>
              <strong>Tipo:</strong> ${user.tipo}</p>
            `).join('')}
          </div>
        `,
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
      
      const cantidad = 10; 
      const response = await fetch(`https://randomuser.me/api/?results=${cantidad}`);
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
