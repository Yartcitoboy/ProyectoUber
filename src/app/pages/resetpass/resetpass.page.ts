import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.page.html',
  styleUrls: ['./resetpass.page.scss'],
})
export class ResetpassPage implements OnInit {
  alertButtons = ['Aceptar'];

  resetForm: FormGroup;
  message = 'Elije qué tipo de usuario deseas ser en la aplicación.';

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private usuariosServices: UsuariosService
  ) { 
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],

    });  
  }

  async Enviar(){

    
  }

  ngOnInit() {
    
  }


}
