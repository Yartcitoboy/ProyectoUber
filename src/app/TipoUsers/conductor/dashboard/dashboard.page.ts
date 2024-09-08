import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { person, time, qrCode } from 'ionicons/icons';
import { Page } from 'src/app/interfaces/page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

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