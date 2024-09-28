import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { IonMenu } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

import { addIcons } from 'ionicons';
import { eye, lockClosed } from 'ionicons/icons';
import { GoogleMap } from '@capacitor/google-maps';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
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
