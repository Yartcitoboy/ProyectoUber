import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal, LoadingController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/firebase/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  @ViewChild(IonModal) modal?: IonModal;

  loginForm: FormGroup;
  emailValue: string = '';
  passValue: string = '';
  tipoValue: string ='';

  constructor(
    private router: Router,
    private loadingController: LoadingController, 
    private formBuilder: FormBuilder,
    private menuController: MenuController,
    private authService: AuthService,
    private firestore: AngularFirestore
  ) {
    // Creando el formulario con validaciones
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
      tipo: ['', [Validators.required]]
    });  
  }

  ngOnInit() {
    this.menuController.enable(false);
  }

  // Cancelar el modal
  cancel() {
    this.modal?.dismiss(null, 'cancel');
  }

  // Manejar el cierre del modal
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent;
    if (ev.detail.role === 'confirm') {
    }
  }

  // Método para confirmar el registro
  async confirm() {
    if (this.loginForm.invalid) {
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por favor, completa el formulario correctamente.',
          confirmButtonText: 'OK',
          heightAuto: false
      });
      return;
    }
    try {
      const loading = await this.loadingController.create({
        message: 'Registrando...',
        duration: 2000,
      });
      await loading.present();

      const { email, pass, tipo } = this.loginForm.value;
      // Registrar al usuario con AuthService
      const aux = await this.authService.registro(email, pass);
      const user = aux.user;
  
      if (user) { 
        // Guardar el usuario en Firestore
        await this.firestore.collection('usuarios').doc(user.uid).set({
          uid: user.uid,
          email: user.email,
          pass: pass,
          tipo: tipo
        });

        localStorage.setItem('usuarioLogin', JSON.stringify({
          tipo: tipo,
          email: user.email
        }));

        await loading.dismiss();
        Swal.fire({
          icon: 'success',
          title: 'Registro Exitoso',
          text: 'Usuario registrado correctamente',
          confirmButtonText: 'OK',
          heightAuto: false
        }).then(() => {
          this.router.navigate(['/loguear']);
        });
      } 
    } catch (error) {
      console.error('Error durante el registro:', error);
      // Mostrar mensaje de error si algo falla
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al registrar el usuario.',
        confirmButtonText: 'OK',
        heightAuto: false
      });
    } 
  }
}
