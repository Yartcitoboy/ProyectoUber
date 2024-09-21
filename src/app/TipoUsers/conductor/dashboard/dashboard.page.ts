import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { IonMenu } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

import { addIcons } from 'ionicons';
import { eye, lockClosed } from 'ionicons/icons';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild(IonMenu) menu?: IonMenu;
  selectedSegment: string = 'default';

  usuarios: Usuario[] = [];

  constructor(
    private menuController: MenuController,
    private usuarioService: UsuariosService
  ) {
    addIcons({ eye, lockClosed });
   }

  ngOnInit() {
    this.menuController.enable(true);
    this.config();
  }
  config(){
    this.usuarios = this.usuarioService.getUsuario();
  }

  
}
