import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-loguear',
  templateUrl: './loguear.page.html',
  styleUrls: ['./loguear.page.scss'],
})
export class LoguearPage implements OnInit {

  loginForm: FormGroup;
  emailValue?: string;
  passValue?: string;

  constructor(
    private router: Router, 
    private loadingController: LoadingController, 
    private alertController: AlertController, 
    private formBuilder: FormBuilder,
    private menuController: MenuController,
    private usuariosService: UsuariosService,
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
    if (this.loginForm.invalid) {
      const alert = await this.alertController.create({
        header: 'Formulario Inválido',
        message: 'Por favor, completa todos los campos.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // CREAMOS EL LOADING
    const loading = await this.loadingController.create({
      message: 'Cargando.....',
      duration: 2000
    });

    // CREAMOS LA ALERTA
    const alert = await this.alertController.create({
      header: 'Acceso denegado',
      message: 'Usuario o contraseña incorrectas!',
      buttons: ['OK']
    });

    const email = this.loginForm.get('email')?.value;
    const pass = this.loginForm.get('pass')?.value;

    // PREGUNTAR POR EL USUARIO
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
<<<<<<< HEAD
          this.router.navigate(['./pasajero-dashboard']);
        } else if (usuario.tipo === 'conductor') {
          this.router.navigate(['./conductor-dashboard']); 
=======
          this.router.navigate(['./pasajero-dashboard']);  
>>>>>>> origin/main
        } else {
          this.router.navigate(['./conductor-dashboard']);
        }
      }, 2000);

    } else {
      await alert.present();
      this.loginForm.reset();  
    }
  }
}
