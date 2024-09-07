import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonModal } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  @ViewChild(IonModal) modal?: IonModal;

  loginForm: FormGroup;
  message = 'Elije qué tipo de usuario deseas ser en la aplicación.';

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private usuariosServices: UsuariosService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });  
  }

  ngOnInit() {}

  cancel() {
    this.modal?.dismiss(null, 'cancel');
  }


  onWillDismiss(event: Event) {
    const ev = event as CustomEvent;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  confirm() {
    console.log('Botón registrarse clickeado');
    if (this.loginForm.valid) {
      console.log('Formulario válido:', this.loginForm.value);
      const nuevoUsuario: Usuario = {
        email: this.loginForm.value.email,
        pass: this.loginForm.value.pass,
        tipo: this.loginForm.value.role
      };

      // Call service to add new user
      this.usuariosServices.addUsuario(nuevoUsuario);
      console.log('Registro exitoso:', nuevoUsuario);
      this.router.navigate(['/login']);
      this.modal?.dismiss(null, 'confirm');
    } else {
      this.alertController.create({
        header: 'Error',
        message: 'Por favor, completa todos los campos correctamente.',
        buttons: ['OK']
      }).then(alert => alert.present());
    }
  }

  
}
