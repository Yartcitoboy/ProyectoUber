import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { IonMenu } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

import { addIcons } from 'ionicons';
<<<<<<< HEAD
import { person, time, qrCode } from 'ionicons/icons';
import { Page } from 'src/app/interfaces/page';
=======
import { eye, lockClosed } from 'ionicons/icons';
import { GoogleMap } from '@capacitor/google-maps';
>>>>>>> rama_isa

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
<<<<<<< HEAD


  public appPages: Page[] = [];
  public tipoUsuario?: string;
  public emailUsuario?: string;

  usuarioLogin?: string;


  constructor(
    private menuController: MenuController
  ) {
    addIcons({ person, time, qrCode})
   }


   ngOnInit() {
    this.menuController.enable(false);
    const usuarioLogin = localStorage.getItem('usuarioLogin');
    if (usuarioLogin) {
      const user = JSON.parse(usuarioLogin);
      this.tipoUsuario = user.tipo;
      this.usuarioLogin = user.email || '';
    } else {
      
    }

  }
}
=======
  @ViewChild(IonMenu) menu?: IonMenu;
  selectedSegment: string = 'default';

  usuarios: Usuario[] = [];
  private map?: GoogleMap;

  constructor(
    private menuController: MenuController,
    private usuarioService: UsuariosService
  ) {
    addIcons({ eye, lockClosed });
  }

  async ngOnInit() {
    this.menuController.enable(true);
    
    this.map = await GoogleMap.create({
      id: 'my-map',
      element: document.getElementById('map') as HTMLElement,
      apiKey: 'AIzaSyBGtiLWSXcSGoNfIS1x7PwrX4aDD9yT9mo',
      config: {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 10,
      },
    });
  }
  
  

  config() {
    this.usuarios = this.usuarioService.getUsuario();
  }
}
>>>>>>> rama_isa
