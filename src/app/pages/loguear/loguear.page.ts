import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/firebase/auth.service';
import Swal from 'sweetalert2';

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
    private alertController: AlertController, 
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private menuController: MenuController,
    private firestore: AngularFirestore,
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
<<<<<<< HEAD
    if (this.loginForm.invalid) {
      const alert = await this.alertController.create({
        header: 'Formulario Inválido',
        message: 'Por favor, completa todos los campos.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Cargando.....',
      duration: 2000
    });

    const alert = await this.alertController.create({
      header: 'Acceso denegado',
      message: 'Usuario o contraseña incorrectas!',
      buttons: ['OK']
    });

    const email = this.loginForm.get('email')?.value;
    const pass = this.loginForm.get('pass')?.value;

    const aux = this.usuariosService.getUsuario();
    const usuario = aux.find(aux => aux.email === email && aux.pass === pass);

    if (usuario) {
      localStorage.setItem('usuarioLogin', JSON.stringify(usuario));
      await loading.present();
      
      setTimeout(async () => {
        await loading.dismiss();

        if (usuario.tipo === 'admin') {
          this.router.navigate(['/usuarios']);
        } else if (usuario.tipo === 'pasajero') {
          this.router.navigate(['./pasajero-dashboard']);  
        } else {
          this.router.navigate(['./conductor-dashboard']);
        }
      }, 2000);


    } else {
      await alert.present();
      this.loginForm.reset();  
=======
    try{
      
      const loading = await this.loadingController.create({
        message: 'Cargando.....',
        duration: 2000
      });
  
      const email = this.emailValue;
      const pass = this.passValue;
  
      const aux = await this.authService.loguear(email as string, pass as string);
  
      if (aux.user) {
  
        const usuarioLogeado = await this.firestore.collection('usuarios').doc(aux.user.uid).get().toPromise()
        const usuarioData = usuarioLogeado?.data() as Usuario;
  
        localStorage.setItem('usuarioLogin', JSON.stringify({
          email: email as string,
          tipo: usuarioData.tipo
        }));
        await loading.present();
        
        setTimeout(async () => {
          await loading.dismiss();
  
          if (usuarioData.tipo === 'admin') {
            this.router.navigate(['/usuarios']);
          } else if (usuarioData.tipo === 'pasajero') {
            this.router.navigate(['./pasajero-dashboard']);  
          } else {
            this.router.navigate(['./conductor-dashboard']);
          }
        }, 2000);
  
      } 
    } catch (error) {
        Swal.fire({
          icon:'error',
          title:'Error',
          text: 'Hubo un error al iniciar sesión.',
          confirmButtonText: 'OK',
          heightAuto: false
        });
        this.emailValue = '';
        this.passValue = '';
      }
>>>>>>> rama_isa
    }

    
    
  }
